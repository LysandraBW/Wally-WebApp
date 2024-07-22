"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetEventsData {
    EmployeeID: number;
}

type Event = {
    EventID: number;
    EmployeeID: number;
    Name: string;
    Date: string;
    Summary: string;
}

export default async function GetEvents(data: GetEventsData, user: User = User.Employee)
: Promise<Array<Event> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .execute('Employee.GetEvents');
        
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}