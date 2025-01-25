import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execPDeleteAppointment(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .execute("Appointment.PDelete");

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testPDeleteAppointment = z.object(appointmentKeySchema);

export const pDeleteAppointment = {
    test: (input) => testPDeleteAppointment.safeParse(input),
    exec: (input) => execPDeleteAppointment(input)
}