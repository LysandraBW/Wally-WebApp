"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface InsertFixData {
    EmployeeID: number;
    AppointmentID: number;
    Fix: string;
}

export default async function InsertFix(data: InsertFixData)
: Promise<number> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Appointment.InsertFix", data));
        return res.recordset[0].FixID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}