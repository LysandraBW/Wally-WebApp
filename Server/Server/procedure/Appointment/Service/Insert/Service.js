import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isString, isBit } from "../../../../validation/effect.js";
import { appointmentKeySchema } from "../../../../validation/schema.js";

export async function execInsertService(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Service', sql.VarChar(50), data.service)
            .input('Division', sql.VarChar(50), data.division)
            .input('Class', sql.VarChar(50), data.class)
            .execute('Appointment.InsertService');

        return output.recordset[0].ServiceID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

export const testInsertService = z.object({
    ...appointmentKeySchema,
    service: isString.max(50),
    division: isString.max(50),
    class: isString.max(50)
});

export const insertService = {
    test: (input) => testInsertService.safeParse(input),
    exec: (input) => execInsertService(input)
}