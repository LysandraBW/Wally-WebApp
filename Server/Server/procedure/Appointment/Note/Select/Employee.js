import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { appointmentKeySchema } from "../../../../validation/schema.js";
import { linkAttachmentsToNotes } from "../../../../util/linkAttachmentsToNotes.js";
import { linkShareesToNotes } from "../../../../util/linkShareesToNotes.js";

export async function execSelectEmployeeNotes(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .execute('Appointment.GetEmployeeNotes');

        const recordsets = output.recordsets;

        // For ease of use, we're attaching the
        // attachments to the notes. Then, we'll
        // be able to easily see the attachments
        // of a note through the note itself.
        const notes = recordsets[0];
        const attachments = recordsets[1];
        const sharees = recordsets[2];
        linkAttachmentsToNotes(notes, attachments);
        linkShareesToNotes(notes, sharees);

        return notes;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const testSelectEmployeeNotes = z.object(appointmentKeySchema);

export const selectEmployeeNotes = {
    test: (input) => testSelectEmployeeNotes.safeParse(input),
    exec: (input) => execSelectEmployeeNotes(input)
}