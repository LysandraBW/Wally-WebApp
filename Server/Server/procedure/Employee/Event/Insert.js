import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isString, isDate, isUniqueIdentifier } from "../../../validation/effect.js";

export async function execInsertEvent(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("Name", sql.VarChar(100), data.name)
            .input("Date", sql.VarChar(30), data.date)
            .input("Summary", sql.VarChar(500), data.summary)
            .execute("Employee.InsertEvent");

        return output.recordset[0].EventID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

export const testInsertEvent = z.object({
    sessionID: isUniqueIdentifier,
    name: isString.max(100),
    date: isDate,
    summary: isString.max(500)
});

export const insertEvent = {
    test: (input) => testInsertEvent.safeParse(input),
    exec: (input) => execInsertEvent(input)
}