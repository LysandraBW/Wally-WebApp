"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface DeletePartData {
    EmployeeID: number;
    AppointmentID: number;
    PartID: number;
}

export default async function DeletePart(data: DeletePartData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.DeletePart", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}