"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface GetEventShareesData {
    EventOwnerID: number;
    EventID: number;
}

type EventSharee = {
    ShareeFName: string;
    ShareeLName: string;
    ShareeID: number;
}

export default async function GetEventSharees(data: GetEventShareesData): 
Promise<Array<EventSharee> | null> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Employee.GetEventSharees", data));
        return res.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}