"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface DeleteNoteShareeData {
    SessionID: string;
    NoteID: number;
    NoteShareeID: number;
}

export default async function DeleteNoteSharee(
    data: DeleteNoteShareeData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('NoteID', sql.Int, data.NoteID)
            .input('NoteShareeID', sql.Int, data.NoteShareeID)
            .execute('DeleteNoteSharee');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}