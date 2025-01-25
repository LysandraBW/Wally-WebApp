import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execSelectDiagnoses(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .execute('Appointment.GetDiagnoses');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const testSelectDiagnoses = z.object(appointmentKeySchema);

export const selectDiagnoses = {
    test: (input) => testSelectDiagnoses.safeParse(input),
    exec: (input) => execSelectDiagnoses(input)
}