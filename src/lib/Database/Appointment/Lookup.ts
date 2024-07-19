"use server";
import sql from "mssql";
import { config, ConfigType } from "../Connection";
import Query from "../Query";

interface AuthenticateLookupData {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}

export default async function AuthenticateLookup(configType: ConfigType, data: AuthenticateLookupData)
: Promise<boolean> {
    try {
        const pool = await sql.connect(await config(configType, data));
        const res = await sql.query(Query("EXEC Appointment.AuthenticateLookup", data));
        await pool.close();
        return res.recordset[0].Found === 1;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}