"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface UpdateDateData {
    EmployeeID: number;
    AppointmentID: number;
    StartDate: string;
    EndDate: string;
}

export default async function UpdateDate(data: UpdateDateData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.UpdateDate", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}