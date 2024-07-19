"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface Data {
    EmployeeID: number;
    AppointmentID: number;
}

export async function Remove(data: Data)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.Remove", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export async function Restore(data: Data)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.PutBack", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}