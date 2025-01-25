import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isInteger } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execDeletePayment(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('PaymentID', sql.Int, data.paymentID)
            .execute('Appointment.DeletePayment');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testDeletePayment = z.object({
    ...appointmentKeySchema,
    paymentID: isInteger
});

export const deletePayment = {
    test: (input) => testDeletePayment.safeParse(input),
    exec: (input) => execDeletePayment(input)
}