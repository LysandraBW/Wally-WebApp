"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface UpdatePartData {
    EmployeeID: number;
    AppointmentID: number;
    PartID: number;
    PartName: string;
    PartNumber: string;
    Quantity: number;
    UnitCost: string;
}

export default async function UpdatePart(data: UpdatePartData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.UpdatePart", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}