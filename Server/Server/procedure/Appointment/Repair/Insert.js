import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isString } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execInsertRepair(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Repair', sql.VarChar, data.repair)
            .execute('Appointment.InsertRepair');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testInsertRepair = z.object({
    ...appointmentKeySchema,
    repair: isString.max(500)
});

export const insertRepair = {
    test: (input) => testInsertRepair.safeParse(input),
    exec: (input) => execInsertRepair(input)
}