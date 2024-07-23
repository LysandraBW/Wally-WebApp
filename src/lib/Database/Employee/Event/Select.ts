"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetEventsData {
    SessionID: string;
}

type Event = {
    EventID: number;
    EmployeeID: number;
    Name: string;
    Date: string;
    Summary: string;
}

export default async function GetEvents(data: GetEventsData, user: User = User.Employee): Promise<Array<Event> | null> {
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
        return null;
    }
}