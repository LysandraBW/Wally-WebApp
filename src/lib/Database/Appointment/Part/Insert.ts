"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface InsertPartData {
    EmployeeID: number;
    AppointmentID: number;
    PartName: string;
    PartNumber: string;
    Quantity: number;
    UnitCost: string;
}

export default async function InsertPart(data: InsertPartData)
: Promise<number> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Appointment.InsertPart", data));
        return res.recordset[0].PartID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}