"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface DeleteEventData {
    EventOwnerID: number;
    EventID: number;
}

export default async function DeleteEvent(data: DeleteEventData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Employee.DeleteEvent", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}