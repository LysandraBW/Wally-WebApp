import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isInteger } from "../../../../validation/effect.js";
import { appointmentKeySchema } from "../../../../validation/schema.js";

export async function execInsertDefinedService(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('ServiceID', sql.Int, data.serviceID)
            .execute('Appointment.InsertDefinedService');

        return output.recordset[0].ServiceID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

export const testInsertDefinedService = z.object({
    ...appointmentKeySchema,
    serviceID: isInteger
});

export const insertDefinedService = {
    test: (input) => testInsertDefinedService.safeParse(input),
    exec: (input) => execInsertDefinedService(input)
}