"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface GetDiagnosisData {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}

export interface Diagnosis {
    DiagnosisID: number;
    Code: string;
    Diagnosis: string;
}

export default async function GetDiagnosis(configType: ConfigType, data: GetDiagnosisData)
: Promise<Array<Diagnosis> | null> {
    try {
        await sql.connect(await config(configType, data));
        const res = await sql.query(Query("EXEC Appointment.GetDiagnosis", data));
        return res.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}