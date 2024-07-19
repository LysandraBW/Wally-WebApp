"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface InsertEventData {
    EmployeeID: number;
    Name: string;
    Date: string;
    Summary: string;
}

export default async function InsertEvent(data: InsertEventData)
: Promise<number> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Employee.InsertEvent", data));
        return res.recordset[0].EventID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}