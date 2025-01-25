import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isString } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execUpdateDiagnosis(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('DiagnosisID', sql.Int, data.diagnosisID)
            .input('Code', sql.VarChar(20), data.code)
            .input('Message', sql.VarChar(500), data.message)
            .execute('Appointment.UpdateDiagnosis');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdateDiagnosis = z.object({
    ...appointmentKeySchema,
    diagnosisID: isString.max(20),
    code: isString.max(20).or(z.null()),
    message: isString.max(500).or(z.null())
});

export const updateDiagnosis = {
    test: (input) => testUpdateDiagnosis.safeParse(input),
    exec: (input) => execUpdateDiagnosis(input)
}