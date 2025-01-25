import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isDate } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execUpdateDate(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .input("StartDate", sql.VarChar(30), data.startDate)
            .input("EndDate", sql.VarChar(30), data.endDate)
            .execute("Appointment.UpdateDate");

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdateDate = z.object({
    ...appointmentKeySchema,
    startDate: isDate.or(z.null()),
    endDate: isDate.or(z.null())
});

export const updateAppointmentDate = {
    test: (input) => testUpdateDate.safeParse(input),
    exec: (input) => execUpdateDate(input)
}