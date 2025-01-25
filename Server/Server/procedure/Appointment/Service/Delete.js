import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isInteger } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execDeleteService(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('ServiceID', sql.Int, data.serviceID)
            .execute('Appointment.DeleteService');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testDeleteService = z.object({
    ...appointmentKeySchema,
    serviceID: isInteger
});

export const deleteService = {
    test: (input) => testDeleteService.safeParse(input),
    exec: (input) => execDeleteService(input)
}