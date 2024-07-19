"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface UpdateDiagnosisData {
    EmployeeID: number;
    AppointmentID: number;
    DiagnosisID: number;
    Code: string;
    Diagnosis: string;
}

export default async function UpdateDiagnosis(data: UpdateDiagnosisData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.UpdateDiagnosis", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}