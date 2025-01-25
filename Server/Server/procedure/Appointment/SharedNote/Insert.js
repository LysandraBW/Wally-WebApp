import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isUniqueIdentifier } from "../../../validation/effect.js";
import { appointmentKeySchema, noteKeySchema } from "../../../validation/schema.js";

export async function execInsertNoteSharee(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('NoteID', sql.Int, data.noteID)
            .input('NoteShareeID', sql.Char(36), data.noteShareeID)
            .execute('Appointment.InsertNoteSharee')
            
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testInsertNoteSharee = z.object({
    ...noteKeySchema,
    noteShareeID: isUniqueIdentifier
});

export const insertNoteSharee = {
    test: (input) => testInsertNoteSharee.safeParse(input),
    exec: (input) => execInsertNoteSharee(input)
}