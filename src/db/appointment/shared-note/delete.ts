"use server";
import sql from "mssql";
import { User } from "../../authentication/user";
import { fetchPool } from "../../authentication/auth";
import { MutateNoteShareeParameters } from "../../define/parameters";

export default async function DeleteNoteSharee(
    data: MutateNoteShareeParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('NoteID', sql.Int, data.NoteID)
            .input('NoteShareeID', sql.UniqueIdentifier, data.NoteShareeID)
            .execute('Appointment.DeleteNoteSharee');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}