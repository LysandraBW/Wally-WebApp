import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isInteger } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execDeleteDiagnosis(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .input("DiagnosisID", sql.Int, data.diagnosisID)
            .execute("Appointment.DeleteDiagnosis");

        return true;

    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testDeleteDiagnosis = z.object({
    ...appointmentKeySchema,
    diagnosisID: isInteger
});

export const deleteDiagnosis = {
    test: (input) => testDeleteDiagnosis.safeParse(input),
    exec: (input) => execDeleteDiagnosis(input)
}