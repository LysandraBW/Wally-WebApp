import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isBitOptional, isInteger } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execUpdateLabel(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('LabelID', sql.Int, data.labelID)
            .input('LabelValue', sql.Bit, data.labelValue)
            .execute('Appointment.UpdateLabel');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdateLabel = z.object({
    ...appointmentKeySchema,
    labelID: isInteger,
    labelValue: isBitOptional
});

export const updateLabel = {
    test: (input) => testUpdateLabel.safeParse(input),
    exec: (input) => execUpdateLabel(input)
}