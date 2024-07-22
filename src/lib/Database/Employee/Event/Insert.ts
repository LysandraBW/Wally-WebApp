"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertEventData {
    SessionID: string;
    Name: string;
    Date: string;
    Summary: string;
}

export default async function InsertEvent(data: InsertEventData, user: User = User.Employee): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.InsertEvent: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('Name', sql.NVarChar(100), data.Name)
            .input('Date', sql.NVarChar, data.Date)
            .input('Summary', sql.NVarChar(500), data.Summary)
            .output('EventID', sql.Int)
            .execute('Employee.InsertEvent');
        
        return output.output.EventID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}