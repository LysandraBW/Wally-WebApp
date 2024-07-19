"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface InsertDefinedServiceData {
    EmployeeID: number | null;
    AppointmentID: number;
    ServiceID: number;
    FName: string | null;
    LName: string | null;
    Email: string | null;
}

export async function InsertDefinedService(configType: ConfigType, data: InsertDefinedServiceData)
: Promise<number> {
    try {
        await sql.connect(await config(configType, data));
        const res = await sql.query(Query("EXEC Appointment.InsertDefinedService", data));
        return res.recordset[0].ServiceID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

interface InsertServiceData {
    EmployeeID: number;
    AppointmentID: number;
    ServiceID: string;
    Service: string;
    Group: string;
    Type: string;
}

export async function InsertService(data: InsertServiceData)
: Promise<number> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Appointment.InsertService", data));
        return res.recordset[0].ServiceID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}