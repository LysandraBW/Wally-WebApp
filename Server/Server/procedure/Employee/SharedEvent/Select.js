import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { eventKeySchema } from "../../../validation/schema.js";

export async function execSelectEventSharees(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("EventID", sql.Int, data.eventID)
            .execute("Employee.GetEventSharees");

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const testSelectEventSharees = z.object(eventKeySchema);

export const selectEventSharees = {
    test: (input) => testSelectEventSharees.safeParse(input),
    exec: (input) => execSelectEventSharees(input)
}