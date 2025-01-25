import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isString, isInteger, isMoney } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execUpdatePart(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            return UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('PartID', sql.Int, data.partID)
            .input('PartName', sql.VarChar(50), data.partName)
            .input('PartNumber', sql.VarChar(50), data.partNumber)
            .input('Quantity', sql.Int, data.quantity)
            .input('UnitCost', sql.Money, data.unitCost)
            .execute('Appointment.UpdatePart');
        
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdatePart = z.object({
    ...appointmentKeySchema,
    partID: isString,
    partName: isString.max(50).or(z.null()),
    partNumber: isString.max(50).or(z.null()),
    quantity: isInteger.or(z.null()),
    unitCost: isMoney.or(z.null())
});

export const updatePart = {
    test: (input) => testUpdatePart.safeParse(input),
    exec: (input) => execUpdatePart(input)
}