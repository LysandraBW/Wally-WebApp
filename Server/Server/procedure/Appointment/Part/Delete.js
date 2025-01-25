import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isInteger } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execDeletePart(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            return UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('PartID', sql.Int, data.partID)
            .execute('Appointment.DeletePart');

        return true;        
    }
    catch (err) {
        console.error(err);
        return false;
    }
} 

export const testDeletePart = z.object({
    ...appointmentKeySchema,
    partID: isInteger
});

export const deletePart = {
    test: (input) => testDeletePart.safeParse(input),
    exec: (input) => execDeletePart(input)
}