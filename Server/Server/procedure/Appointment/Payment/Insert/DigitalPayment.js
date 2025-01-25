import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isMoney, isString } from "../../../../validation/effect.js";
import { appointmentKeySchema } from "../../../../validation/schema.js";

export async function execInsertDigitalPayment(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Payment', sql.Money, data.payment)
            .input('Name', sql.VarChar, data.name)
            .input('Type', sql.VarChar, data.type)
            .input('CCN', sql.Char(3), data.ccn)
            .input('EXP', sql.Char(4), data.exp)
            .execute('Appointment.InsertDigitalPayment');

        return output.recordset[0].PaymentID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

export const testInsertDigitalPayment = z.object({
    ...appointmentKeySchema,
    payment: isMoney,
    name: isString.max(100),
    type: isString.max(10),
    ccn: isString.max(4),
    exp: isString.max(4)
});

export const insertDigitalPayment = {
    test: (input) => testInsertDigitalPayment.safeParse(input),
    exec: (input) => execInsertDigitalPayment(input)
}