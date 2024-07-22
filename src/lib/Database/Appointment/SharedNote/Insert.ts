"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertNoteShareeData {
    NoteOwnerID: number;
    NoteID: number;
    NoteShareeID: number;
}

export default async function InsertNoteSharee(
    data: InsertNoteShareeData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('NoteOwnerID', sql.Int, data.NoteOwnerID)
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