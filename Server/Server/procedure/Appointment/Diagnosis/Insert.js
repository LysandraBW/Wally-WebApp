import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isString } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execInsertDiagnosis(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .input("Code", sql.VarChar(20), data.code)
            .input("Message", sql.VarChar(500), data.message)
            .execute("Appointment.InsertDiagnosis");

        return output.recordset[0].DiagnosisID;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testInsertDiagnosis = z.object({
    ...appointmentKeySchema,
    code: isString.max(20),
    message: isString.max(500)
});

export const insertDiagnosis = {
    test: (input) => testInsertDiagnosis.safeParse(input),
    exec: (input) => execInsertDiagnosis(input)
}