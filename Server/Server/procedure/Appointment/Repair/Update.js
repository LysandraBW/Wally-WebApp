import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isString } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execUpdateRepair(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('RepairID', sql.Int, data.repairID)
            .input('Repair', sql.VarChar(500), data.repair)
            .execute('Appointment.UpdateRepair');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdateRepair = z.object({
    ...appointmentKeySchema,
    repairID: isString,
    repair: isString.max(500).or(z.null())
});

export const updateRepair = {
    test: (input) => testUpdateRepair.safeParse(input),
    exec: (input) => execUpdateRepair(input)
}