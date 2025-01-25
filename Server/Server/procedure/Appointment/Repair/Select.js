import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execSelectRepairs(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .execute('Appointment.GetRepairs');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const testSelectRepairs = z.object(appointmentKeySchema);

export const selectRepairs = {
    test: (input) => testSelectRepairs.safeParse(input),
    exec: (input) => execSelectRepairs(input)
}