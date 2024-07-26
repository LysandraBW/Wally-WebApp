"use server";
import sql from "mssql";
import { User } from "../../User";
import { fetchPool } from "../../Pool";
import { UpdateNoteParameters } from "../../Parameters";

export default async function UpdateNote(
    data: UpdateNoteParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdateNote: Undefined Pool';
        
        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('NoteID', sql.Int, data.NoteID)
            .input('Head', sql.Int, data.Head)
            .input('Body', sql.Int, data.Body)
            .input('ShowCustomer', sql.Int, data.ShowCustomer)
            .execute('Appointment.UpdateNote');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}