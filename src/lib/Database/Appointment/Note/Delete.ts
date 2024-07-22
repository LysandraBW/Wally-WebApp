"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface DeleteNoteData {
    SessionID: string;
    AppointmentID: string;
    NoteID: number;
}

export default async function DeletePart(
    data: DeleteNoteData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.DeletePart: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('NoteID', sql.Int, data.NoteID)
            .execute('Appointment.DeleteNote');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}