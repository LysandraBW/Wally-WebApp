"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateEventData {
    EventOwnerID: number;
    EventID: number;
    Name: string | null;
    Date: string | null;
    Summary: string | null;
}

export default async function UpdateEvent(data: UpdateEventData, user: User = User.Employee)
: Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('EventOwnerID', sql.Int, data.EventOwnerID)
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