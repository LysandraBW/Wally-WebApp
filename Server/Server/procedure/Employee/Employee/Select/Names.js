import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isUniqueIdentifier } from "../../../../validation/effect.js";

export async function execSelectAllEmployees(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("IncludeMe", sql.Bit, 0)
            .execute("Employee.GetNames");
        
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const testSelectNames = z.object({
    sessionID: isUniqueIdentifier
});

export const selectNames = {
    test: (input) => testSelectNames.safeParse(input),
    exec: (input) => execSelectAllEmployees(input)
}