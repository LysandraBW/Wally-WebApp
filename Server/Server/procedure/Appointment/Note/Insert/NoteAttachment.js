import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isString } from "../../../../validation/effect.js";
import { noteKeySchema } from "../../../../validation/schema.js";

export async function execInsertNoteAttachment(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('NoteID', sql.Int, data.noteID)
            .input('Name', sql.VarChar(100), data.name)
            .input('Type', sql.VarChar(100), data.type)
            .input('URL', sql.VarChar(500), data.url)
            .execute('Appointment.InsertNoteAttachment');

        return output.recordset[0].AttachmentID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

export const testInsertNoteAttachment = z.object({
    ...noteKeySchema,
    name:       isString.max(100),
    type:       isString.max(100),
    url:        isString.max(500)
});

export const insertNoteAttachment = {
    test: (input) => testInsertNoteAttachment.safeParse(input),
    exec: (input) => execInsertNoteAttachment(input)
}