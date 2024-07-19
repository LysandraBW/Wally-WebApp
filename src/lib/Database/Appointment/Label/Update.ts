"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface UpdateLabelData {
    EmployeeID: number;
    AppointmentID: number;
    Label: string;
}

export default async function UpdateLabel(data: UpdateLabelData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.UpdateLabel", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}