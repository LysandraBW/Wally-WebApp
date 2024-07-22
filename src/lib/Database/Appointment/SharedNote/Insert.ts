"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertNoteShareeData {
    SessionID: string;
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
            throw 'Appointment.InsertNoteSharee: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
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