import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isUniqueIdentifier } from "../../../validation/effect.js";

export async function execLogout(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .execute("Employee.LogoutEmployee");

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testLogout = z.object({
    sessionID: isUniqueIdentifier
});

export const employeeLogout = {
    test: (input) => testLogout.safeParse(input),
    exec: (input) => execLogout(input)
}