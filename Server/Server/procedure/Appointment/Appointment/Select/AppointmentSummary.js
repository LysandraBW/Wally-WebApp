import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getCustomerPool } from "../../../../connectionPool.js";
import { appointmentKeySchema } from "../../../../validation/schema.js";

export async function execSelectAppointmentSummary(data) {
    try {
        const pool = await getCustomerPool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .execute("Appointment.GetSummary")
        
        return {
            ...output.recordsets[0][0],
            Services: output.recordsets[1],
            Diagnoses: output.recordsets[2],
            Repairs: output.recordsets[3],
            Notes: output.recordsets[4]
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

// Tests the input for selecting an appointment's summary.
export const testSelectAppointmentSummary = z.object(appointmentKeySchema);

// Wraps the two functions neatly.
export const selectAppointmentSummary = {
    test: (input) => testSelectAppointmentSummary.safeParse(input),
    exec: (input) => execSelectAppointmentSummary(input)
}