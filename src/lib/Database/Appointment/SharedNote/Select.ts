"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetNoteShareesData {
    SessionID: string;
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
            throw 'Appointment.GetNoteSharees: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('NoteID', sql.Int, data.NoteID)
            .execute('Appointment.GetNoteSharees');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}