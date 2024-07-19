"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface UpdateEventData {
    EventOwnerID: number;
    EventID: number;
    Name: string;
    Date: string;
    Summary: string;
}

export default async function UpdateEvent(data: UpdateEventData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Employee.UpdateEvent", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}