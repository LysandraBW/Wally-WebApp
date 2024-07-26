"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { InsertEventParameters } from "../../Parameters";

export async function InsertEvent(
    data: InsertEventParameters, 
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.InsertEvent: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('Name', sql.NVarChar(100), data.Name)
            .input('Date', sql.NVarChar, data.Date)
            .input('Summary', sql.NVarChar(500), data.Summary)
            .execute('Employee.InsertEvent');
        
        return output.recordset[0].EventID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}