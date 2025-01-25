import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isString, isBit } from "../../../../validation/effect.js";
import { appointmentKeySchema } from "../../../../validation/schema.js";

export async function execInsertNote(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Head', sql.VarChar(100), data.head)
            .input('Body', sql.VarChar(500), data.body)
            .input('ShowCustomer', sql.Bit, data.showCustomer)
            .execute('Appointment.InsertNote');

        return output.recordset[0].NoteID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

export const testInsertNote = z.object({
    ...appointmentKeySchema,
    head: isString.max(100),
    body: isString.max(500),
    showCustomer: z.coerce.number().refine(n => n === 0 || n === 1)
});

export const insertNote = {
    test: (input) => testInsertNote.safeParse(input),
    exec: (input) => execInsertNote(input)
}