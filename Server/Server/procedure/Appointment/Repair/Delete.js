import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isInteger } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execDeleteRepair(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('RepairID', sql.Int, data.repairID)
            .execute('Appointment.DeleteRepair');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testDeleteRepair = z.object({
    ...appointmentKeySchema,
    repairID: isInteger
});

export const deleteRepair = {
    test: (input) => testDeleteRepair.safeParse(input),
    exec: (input) => execDeleteRepair(input)
}