import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isUniqueIdentifier } from "../../../validation/effect.js";
import { eventKeySchema } from "../../../validation/schema.js";

export async function execInsertEventSharee(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("EventID", sql.Int, data.eventID)
            .input("EventShareeID", sql.UniqueIdentifier, data.eventShareeID)
            .execute("Employee.InsertEventSharee");

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testInsertEventSharee = z.object({
    ...eventKeySchema,
    eventShareeID: isUniqueIdentifier
});

export const insertEventSharee = {
    test: (input) => testInsertEventSharee.safeParse(input),
    exec: (input) => execInsertEventSharee(input)
}