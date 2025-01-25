import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isCommaJoinedIntArray, isCommaJoinedUUIDArray, isUniqueIdentifier } from "../../../validation/effect.js";

export async function execPDeleteAppointments(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentIDs", sql.VarChar(1000), data.appointmentIDs)
            .execute("Appointment.PDeleteMultiple");

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testPDeleteAppointments = z.object({
    sessionID: isUniqueIdentifier,
    appointmentIDs: isCommaJoinedUUIDArray
});

export const pDeleteAppointments = {
    test: (input) => testPDeleteAppointments.safeParse(input),
    exec: (input) => execPDeleteAppointments(input)
}