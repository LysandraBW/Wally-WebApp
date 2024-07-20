"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

interface GetNoteShareesData {
    NoteOwnerID: number;
    NoteID: number;
}

type NoteSharee = {
    ShareeFName: string;
    ShareeLName: string;
    ShareeID: number;
}

export default async function GetNoteSharees(
    data: GetNoteShareesData, 
    user: User = User.Employee
): Promise<Array<NoteSharee> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('NoteOwnerID', sql.Int, data.NoteOwnerID)
            .input('NoteID', sql.Int, data.NoteID)
            .execute('Appointment.GetNoteSharees');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}