"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface UpdateFixData {
    EmployeeID: number;
    AppointmentID: number;
    FixID: number;
    Fix: string;
}

export default async function UpdateFix(data: UpdateFixData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.UpdateFix", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}