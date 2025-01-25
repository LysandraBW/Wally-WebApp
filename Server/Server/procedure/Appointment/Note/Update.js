import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isString, isBit } from "../../../validation/effect.js";
import { noteKeySchema } from "../../../validation/schema.js";

export async function execUpdateNote(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('NoteID', sql.Int, data.noteID)
            .input('Head', sql.VarChar(100), data.head)
            .input('Body', sql.VarChar(500), data.body)
            .input('ShowCustomer', sql.Int, data.showCustomer)
            .execute('Appointment.UpdateNote');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdateNote = z.object({
    ...noteKeySchema,
    head: isString.max(100).or(z.null()),
    body: isString.max(500).or(z.null()),
    showCustomer: isBit.or(z.null())
});

export const updateNote = {
    test: (input) => testUpdateNote.safeParse(input),
    exec: (input) => execUpdateNote(input)
}