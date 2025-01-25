import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getStandardPool } from "../../../connectionPool.js";
import { isUniqueIdentifier } from "../../../validation/effect.js";

export async function execAuthenticateSession(data) {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .execute("Appointment.AuthenticateSession");

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testAuthenticateSession = z.object({
    sessionID: isUniqueIdentifier
});

export const authenticateAppointment = {
    test: (input) => testAuthenticateSession.safeParse(input),
    exec: (input) => execAuthenticateSession(input)
}