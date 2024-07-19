"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface DeleteEventShareesData {
    EventOwnerID: number;
    EventID: number;
    EventShareeID: number;
}

export default async function DeleteEventSharee(data: DeleteEventShareesData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Employee.DeleteEventSharee", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}