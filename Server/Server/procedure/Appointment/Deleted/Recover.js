import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execRecoverAppointment(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .execute("Appointment.Recover");
        
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testRecoverAppointment = z.object(appointmentKeySchema);

export const recoverAppointment = {
    test: (input) => testRecoverAppointment.safeParse(input),
    exec: (input) => execRecoverAppointment(input)
}