"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { MutateNoteShareeParameters } from "../../Parameters";

export default async function InsertNoteSharee(
    data: MutateNoteShareeParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.InsertNoteSharee: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('NoteID', sql.Int, data.NoteID)
            .input('NoteShareeID', sql.Int, data.NoteShareeID)
            .execute('Appointment.InsertNoteSharee')

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}