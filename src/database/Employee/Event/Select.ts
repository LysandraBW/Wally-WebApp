"use server";
import sql from "mssql";
import { User } from "../../User";
import { DB_Event } from "../../Types";
import { fetchPool } from "../../Pool";
import { SessionParameter } from "../../Parameters";

export async function GetEvents(
    data: SessionParameter, 
    user: User = User.Employee
): Promise<Array<DB_Event>> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.GetEvents: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .execute('Employee.GetEvents');
        
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}