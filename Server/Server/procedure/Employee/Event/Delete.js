import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { eventKeySchema } from "../../../validation/schema.js";

export async function execDeleteEvent(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("EventID", sql.Int, data.eventID)
            .execute("Employee.DeleteEvent");
        
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testDeleteEvent = z.object(eventKeySchema);

export const deleteEvent = {
    test: (input) => testDeleteEvent.safeParse(input),
    exec: (input) => execDeleteEvent(input)
}