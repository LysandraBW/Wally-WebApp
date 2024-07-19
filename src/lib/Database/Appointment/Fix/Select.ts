"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface GetFixesData {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}

export interface Fix {
    FixID: number;
    Fix: string;
}

export default async function GetFixes(configType: ConfigType, data: GetFixesData)
: Promise<Array<Fix> | null> {
    try {
        await sql.connect(await config(configType, data));
        const res = await sql.query(Query("EXEC Appointment.GetFixes", data));
        return res.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}