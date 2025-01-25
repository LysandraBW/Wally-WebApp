import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isInteger } from "../../../../validation/effect.js";
import { noteKeySchema } from "../../../../validation/schema.js";

export async function execDeleteNoteAttachment(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AttachmentID', sql.Int, data.attachmentID)
            .input('NoteID', sql.Int, data.noteID)
            .execute('Appointment.DeleteNoteAttachment');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testDeleteNoteAttachment = z.object({
    ...noteKeySchema,
    attachmentID: isInteger,
});

export const deleteNoteAttachment = {
    test: (input) => testDeleteNoteAttachment.safeParse(input),
    exec: (input) => execDeleteNoteAttachment(input)
}