"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface GetServicesData {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}

export type Service = {
    ServiceID: number;
    AppointmentID: number;
    Type: string;
    GroupName: string;
    Service: string;
}

export default async function GetServices(configType: ConfigType, data: GetServicesData)
: Promise<Array<Service> | null> {
    try {
        await sql.connect(await config(configType, data));
        const res = await sql.query(Query("EXEC Appointment.GetServices", data));
        return res.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}