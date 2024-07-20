"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

interface InsertNoteData {
    EmployeeID: number;
    AppointmentID: number;
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
            throw '';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
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