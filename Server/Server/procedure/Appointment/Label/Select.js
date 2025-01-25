import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execSelectLabels(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .execute("Appointment.GetLabels");

        // For ease of use, we'll be
        // organizing the labels.
        const labels = output.recordset;
        const organizedLabels = organizeAppointmentLabels(labels);

        return organizedLabels;
    }
    catch (err) {
        console.error(err);
        return {};
    }
}

export const testSelectLabels = z.object(appointmentKeySchema);

export const selectAppointmentLabels = {
    test: (input) => testSelectLabels.safeParse(input),
    exec: (input) => execSelectLabels(input)
}