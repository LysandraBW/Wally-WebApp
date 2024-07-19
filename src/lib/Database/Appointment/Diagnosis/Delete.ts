"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface DeleteDiagnosisData {
    EmployeeID: number;
    AppointmentID: number;
    DiagnosisID: number;
}

export default async function DeleteDiagnosis(data: DeleteDiagnosisData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.DeleteDiagnosis", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}