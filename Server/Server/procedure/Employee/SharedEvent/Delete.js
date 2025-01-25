import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isUniqueIdentifier } from "../../../validation/effect.js";
import { eventKeySchema } from "../../../validation/schema.js";

export async function execDeleteEventSharee(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("EventID", sql.Int, data.eventID)
            .input("EventShareeID", sql.UniqueIdentifier, data.eventShareeID)
            .execute("Employee.DeleteEventSharee");
        
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

export const testDeleteEventSharee = z.object({
    ...eventKeySchema,
    eventShareeID: isUniqueIdentifier
});

export const deleteEventSharee = {
    test: (input) => testDeleteEventSharee.safeParse(input),
    exec: (input) => execDeleteEventSharee(input)
}