"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface DeleteFixData {
    EmployeeID: number;
    AppointmentID: number;
    FixID: number;
}

export default async function DeleteFix(data: DeleteFixData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.DeleteFix", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}