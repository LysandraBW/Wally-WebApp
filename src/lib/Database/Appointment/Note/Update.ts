"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

interface UpdateNoteData {
    NoteOwnerID: number;
    AppointmentID: number;
    NoteID: number;
    Head: string;
    Body: string;
    Attachment: string;
    ShowCustomer: number;
}

export default async function UpdateNote(
    data: UpdateNoteData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';
        
        await pool.request()
            .input('NoteOwnerID', sql.Int, data.NoteOwnerID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('NoteID', sql.Int, data.NoteID)
            .input('Head', sql.Int, data.Head)
            .input('Body', sql.Int, data.Body)
            .input('Attachment', sql.Int, data.Attachment)
            .input('ShowCustomer', sql.Int, data.ShowCustomer)
            .execute('Appointment.UpdateNote');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}