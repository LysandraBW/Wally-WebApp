import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isString, isDate } from "../../../validation/effect.js";
import { eventKeySchema } from "../../../validation/schema.js";

export async function execUpdateEvent(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("EventID", sql.Int, data.eventID)
            .input("Name", sql.NVarChar, data.name)
            .input("Date", sql.NVarChar, data.date)
            .input("Summary", sql.NVarChar(500), data.summary)
            .execute("Employee.UpdateEvent");
        
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdateEvent = z.object({
    ...eventKeySchema,
    name: isString.max(100).or(z.null()),
    date: isDate.or(z.null()),
    summary: isString.max(500).or(z.null())
});

export const updateEvent = {
    test: (input) => testUpdateEvent.safeParse(input),
    exec: (input) => execUpdateEvent(input)
}