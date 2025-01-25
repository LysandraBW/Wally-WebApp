import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getCustomerPool } from "../../../../connectionPool.js";
import { appointmentKeySchema } from "../../../../validation/schema.js";

export async function execSelectCustomerNotes(data) {
    try {
        const pool = await getCustomerPool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .execute('Appointment.GetCustomerNotes');    
            
        const recordsets = output.recordsets;

        // Ease of Use
        const notes = recordsets[0];
        const attachments = recordsets[1];
        linkAttachmentsToNotes(notes, attachments);

        return notes;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const testSelectCustomerNotes = z.object(appointmentKeySchema);

export const selectCustomerNotes = {
    test: (input) => testSelectCustomerNotes.safeParse(input),
    exec: (input) => execSelectCustomerNotes(input)
}