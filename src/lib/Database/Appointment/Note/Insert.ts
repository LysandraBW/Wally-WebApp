"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertNoteData {
    SessionID: string;
    AppointmentID: string;
    Head: string;
    Body: string;
    Attachment: string;
    ShowCustomer: number;
}

export default async function InsertNote(
    data: InsertNoteData, 
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.InsertNote: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Head', sql.VarChar, data.Head)
            .input('Body', sql.VarChar, data.Body)
            .input('Attachment', sql.VarChar, data.Attachment)
            .input('ShowCustomer', sql.VarChar, data.ShowCustomer)
            .output('NoteID', sql.Int)
            .execute('Appointment.InsertNote');

        return output.output.NoteID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}