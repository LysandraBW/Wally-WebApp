import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execSelectNoteSharees(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('NoteID', sql.Int, data.noteID)
            .execute('Appointment.GetNoteSharees');
            
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const testSelectNoteSharees = z.object(appointmentKeySchema);

export const selectNoteSharees = {
    test: (input) => testSelectNoteSharees.safeParse(input),
    exec: (input) => execSelectNoteSharees(input)
}