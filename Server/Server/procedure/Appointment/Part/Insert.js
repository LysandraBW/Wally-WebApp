import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isString, isInteger, isMoney } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execInsertPart(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            return UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('PartName', sql.VarChar(50), data.partName)
            .input('PartNumber', sql.VarChar(50), data.partNumber)
            .input('Quantity', sql.Int, data.quantity)
            .input('UnitCost', sql.Money, data.unitCost)
            .execute('Appointment.InsertPart');

        return output.recordset[0].PartID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
} 

export const testInsertPart = z.object({
    ...appointmentKeySchema,
    partName: isString.max(50),
    partNumber: isString.max(50),
    quantity: isInteger,
    unitCost: isMoney
});

export const insertPart = {
    test: (input) => testInsertPart.safeParse(input),
    exec: (input) => execInsertPart(input)
}