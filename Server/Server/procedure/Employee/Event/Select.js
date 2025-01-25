import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isUniqueIdentifier } from "../../../validation/effect.js";
import { linkShareesToEvents } from "../../../util/linkShareesToEvents.js";

export async function execSelectEvents(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .execute("Employee.GetEvents");

        const recordsets = output.recordsets;
        const events = recordsets[0];
        const sharees = recordsets[1];
        linkShareesToEvents(events, sharees);
        
        return events;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const testSelectEvents = z.object({
    sessionID: isUniqueIdentifier
});

export const selectEvents = {
    test: (input) => testSelectEvents.safeParse(input),
    exec: (input) => execSelectEvents(input)
}