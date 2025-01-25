import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isInteger } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execUpdateStatus(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('StatusID', sql.Int, data.statusID)
            .execute('Appointment.UpdateStatus');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdateStatus = z.object({
    ...appointmentKeySchema,
    statusID: isInteger.or(z.null()),
});

export const updateStatus = {
    test: (input) => testUpdateStatus.safeParse(input),
    exec: (input) => execUpdateStatus(input)
}