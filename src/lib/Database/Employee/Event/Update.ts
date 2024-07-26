"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { UpdateEventParameters } from "../../Parameters";

export async function UpdateEvent(
    data: UpdateEventParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.UpdateEvent: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('EventID', sql.Int, data.EventID)
            .input('Name', sql.VarChar(100), data.Name)
            .input('Date', sql.NVarChar, data.Date)
            .input('Summary', sql.NVarChar(500), data.Summary)
            .execute('Employee.UpdateEvent');
            
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}