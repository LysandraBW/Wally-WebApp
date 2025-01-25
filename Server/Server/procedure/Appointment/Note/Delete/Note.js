import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isInteger } from "../../../../validation/effect.js";
import { appointmentKeySchema } from "../../../../validation/schema.js";

export async function execDeleteNote(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('NoteID', sql.Int, data.noteID)
            .execute('Appointment.DeleteNote');
        
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testDeleteNote = z.object({
    noteID: isInteger,
    ...appointmentKeySchema
});

export const deleteNote = {
    test: (input) => testDeleteNote.safeParse(input),
    exec: (input) => execDeleteNote(input)
}