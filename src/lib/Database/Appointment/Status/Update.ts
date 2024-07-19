"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface UpdateStatusData {
    EmployeeID: number;
    AppointmentID: number;
    StatusID: number;
}

export default async function UpdateStatus(data: UpdateStatusData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.UpdateStatus", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}