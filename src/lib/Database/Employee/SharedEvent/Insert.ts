"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface InsertEventShareesData {
    EventOwnerID: number;
    EventID: number;
    EventShareeID: number;
}

export default async function InsertEventSharee(data: InsertEventShareesData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Employee.InsertEventSharee", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}