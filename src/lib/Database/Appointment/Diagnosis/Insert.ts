"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface InsertDiagnosisData {
    EmployeeID: number;
    AppointmentID: number;
    Code: string;
    Diagnosis: string;
}

export default async function InsertDiagnosis(data: InsertDiagnosisData)
: Promise<number> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Appointment.InsertDiagnosis", data));
        return res.recordset[0].DiagnosisID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}