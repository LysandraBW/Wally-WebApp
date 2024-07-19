"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface UpdateServiceData {
    EmployeeID: number;
    AppointmentID: number;
    ServiceID: number;
    Service: string;
    GroupName: string;
    Type: string;
}

export default async function UpdateService(data: UpdateServiceData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.UpdateService", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}