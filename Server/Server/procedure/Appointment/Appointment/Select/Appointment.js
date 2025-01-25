import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { appointmentKeySchema } from "../../../../validation/schema.js";
import { organizeAppointmentLabels } from "../../../../util/organizeAppointmentLabels.js";
import { linkAttachmentsToNotes } from "../../../../util/linkAttachmentsToNotes.js";
import { linkShareesToNotes } from "../../../../util/linkShareesToNotes.js";

export async function execSelectAppointment(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .execute("Appointment.Get");

        // Contains all the tables that were
        // selected in the prior proecdure.
        // This is stored in an array.
        const recordsets = output.recordsets;

        // The notes and note attachments are
        // returned separately. Here, we're
        // linking them together (ease of use).
        const notes = recordsets[7];
        const noteAttachments = recordsets[8];
        const noteSharees = recordsets[9];
        linkAttachmentsToNotes(notes, noteAttachments);
        linkShareesToNotes(notes, noteSharees);

        // The labels are organized in an
        // unhelpful way. So, we're going to
        // organize them into an object for
        // ease of use.
        const labels = recordsets[6];
        const organizedLabels = organizeAppointmentLabels(labels);

        return {
            ...recordsets[0][0],
            Services: recordsets[1],
            Diagnoses: recordsets[2],
            Repairs: recordsets[3],
            Parts: recordsets[4],
            Payments: recordsets[5],
            Labels: organizedLabels,
            Notes: notes
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

// Validates the input for
// selecting an appointment.
export const testSelectAppointment = z.object(appointmentKeySchema);

// Wraps the two functions neatly.
export const selectAppointment = {
    test: (input) => testSelectAppointment.safeParse(input),
    exec: (input) => execSelectAppointment(input)
}