"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface GetPartsData {
    EmployeeID: number;
    AppointmentID: number;
}

interface Part {
    PartID: number;
    PartName: string;
    PartNumber: string;
    Quantity: string;
    UnitCost: string;
}

export default async function GetParts(data: GetPartsData)
: Promise<Array<Part> | null> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Appointment.GetParts", data));
        return res.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}