"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { DB_NoteSharee } from "../../Types";
import { GetNoteShareesParameters } from "../../Parameters";

export default async function GetNoteSharees(
    data: GetNoteShareesParameters, 
    user: User = User.Employee
): Promise<Array<DB_NoteSharee>> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetNoteSharees: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('NoteID', sql.Int, data.NoteID)
            .execute('Appointment.GetNoteSharees');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}