import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isString, isInteger } from "../../../../validation/effect.js";
import { appointmentKeySchema } from "../../../../validation/schema.js";

export async function execInsertCreditCard(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('PaymentID', sql.Int, data.paymentID)
            .input('Name', sql.VarChar(100), data.name)
            .input('Type', sql.VarChar(10), data.type)
            .input('CCN', sql.VarChar(4), data.ccn)
            .input('EXP', sql.VarChar(4), data.exp)
            .execute('Appointment.InsertCreditCard');

        return true;   
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testInsertCreditCard = z.object({
    ...appointmentKeySchema,
    paymentID:      isInteger,
    name:           isString.max(100),
    type:           isString.max(10),
    ccn:            isString.max(4),
    exp:            isString.max(4)
});

export const insertCreditCard = {
    test: (input) => testInsertCreditCard.safeParse(input),
    exec: (input) => execInsertCreditCard(input)
}