"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface UpdateCostData {
    EmployeeID: number;
    AppointmentID: number;
    Cost: string;
}

export default async function UpdateCost(data: UpdateCostData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.UpdateCost", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}