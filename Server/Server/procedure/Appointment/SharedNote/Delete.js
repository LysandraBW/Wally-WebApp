import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isUniqueIdentifier } from "../../../validation/effect.js";
import { noteKeySchema } from "../../../validation/schema.js";

export async function execDeleteNoteSharee(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('NoteID', sql.Int, data.noteID)
            .input('NoteShareeID', sql.UniqueIdentifier, data.noteShareeID)
            .execute('Appointment.DeleteNoteSharee');
            
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testDeleteNoteSharee = z.object({
    ...noteKeySchema,
    noteShareeID: isUniqueIdentifier
});

export const deleteNoteSharee = {
    test: (input) => testDeleteNoteSharee.safeParse(input),
    exec: (input) => execDeleteNoteSharee(input)
}