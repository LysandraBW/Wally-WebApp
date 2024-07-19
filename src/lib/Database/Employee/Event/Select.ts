"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";

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

export default async function GetEvents(data: GetEventsData)
: Promise<Array<Event> | null> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(`EXEC Employee.GetEvents @EmployeeID=${data.EmployeeID}`);
        return res.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}