import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isString } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execUpdateService(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('ServiceID', sql.Int, data.serviceID)
            .input('Service', sql.VarChar(50), data.service)
            .input('Division', sql.VarChar(50), data.division)
            .input('Class', sql.VarChar(50), data.class)
            .execute('Appointment.UpdateService');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdateService = z.object({
    ...appointmentKeySchema,
    service: isString.max(50).optional(),
    division: isString.max(50).optional(),
    class: isString.max(50).optional()
});

export const updateService = {
    test: (input) => testUpdateService.safeParse(input),
    exec: (input) => execUpdateService(input)
}