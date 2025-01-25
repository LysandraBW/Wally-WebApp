import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execSelectParts(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            return UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .execute('Appointment.GetParts')

        return output.recordset;           
    }
    catch (err) {
        console.error(err);
        return [];
    }
} 

export const testSelectParts = z.object(appointmentKeySchema);

export const selectParts = {
    test: (input) => testSelectParts.safeParse(input),
    exec: (input) => execSelectParts(input)
}