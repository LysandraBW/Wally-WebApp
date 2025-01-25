import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isUniqueIdentifier } from "../../../../validation/effect.js";

export async function execSelectEmployee(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .execute("Employee.Get");

        return output.recordset[0];
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export const testSelectEmployee = z.object({
    sessionID: isUniqueIdentifier
});

export const selectEmployee = {
    test: (input) => testSelectEmployee.safeParse(input),
    exec: (input) => execSelectEmployee(input)
}