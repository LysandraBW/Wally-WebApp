import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getStandardPool } from "../../../connectionPool.js";
import { isEmail, isUniqueIdentifier } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execAuthorizeLookup(data) {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("Email", sql.VarChar(320), data.email)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .output("SessionID", sql.Char(36))
            .execute("Appointment.AuthorizeLookup");

        return output.output.SessionID;
    }
    catch (err) {
        console.error(err);
        return "";
    }
}

export const testAuthorizeLookup = z.object({
    appointmentID: isUniqueIdentifier,
    email: isEmail
});

export const authorizeLookup = {
    test: (input) => testAuthorizeLookup.safeParse(input),
    exec: (input) => execAuthorizeLookup(input)
}