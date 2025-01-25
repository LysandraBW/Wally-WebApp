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
            .execute("Employee.GetAll");
        
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const testSelectAllEmployees = z.object({
    sessionID: isUniqueIdentifier
});

export const selectAllEmployees = {
    test: (input) => testSelectAllEmployees.safeParse(input),
    exec: (input) => execSelectAllEmployees(input)
}