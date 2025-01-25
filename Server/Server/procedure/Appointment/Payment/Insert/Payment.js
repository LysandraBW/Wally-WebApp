import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isMoney } from "../../../../validation/effect.js";
import { appointmentKeySchema } from "../../../../validation/schema.js";

export async function execInsertPayment(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Payment', sql.Money, data.payment)
            .execute('Appointment.InsertPayment');

        return output.recordset[0].PaymentID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

export const testInsertPayment = z.object({
    ...appointmentKeySchema,
    payment: isMoney
});

export const insertPayment = {
    test: (input) => testInsertPayment.safeParse(input),
    exec: (input) => execInsertPayment(input)
}