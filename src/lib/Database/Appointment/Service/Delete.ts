"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface DeleteServiceData {
    EmployeeID: number;
    AppointmentID: number;
    ServiceID: number;
}

export default async function DeleteService(data: DeleteServiceData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.DeleteService", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}