import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isMoney } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execUpdateCost(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Cost', sql.Float, data.cost)
            .execute('Appointment.UpdateCost');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdateCost = z.object({
    ...appointmentKeySchema,
    cost: isMoney.or(z.null())
});

export const updateCost = {
    test: (input) => testUpdateCost.safeParse(input),
    exec: (input) => execUpdateCost(input)
}