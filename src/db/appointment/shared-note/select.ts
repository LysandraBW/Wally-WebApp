"use server";
import sql from "mssql";
import { fetchPool } from "../../authentication/auth";
import { User } from "../../authentication/user";
import { DB_NoteSharee } from "../../define/interfaces";
import { GetNoteShareesParameters } from "../../define/parameters";

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