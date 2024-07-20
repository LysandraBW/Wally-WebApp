"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

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

export default async function GetDiagnosis(
    data: GetDiagnosisData, 
    user: User = User.Employee
): Promise<Array<Diagnosis> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        const output = await pool.request()
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('FName', sql.VarChar, data.FName)
            .input('LName', sql.VarChar, data.LName)
            .input('Email', sql.VarChar, data.Email)
            .execute('Appointment.GetDiagnosis');

        return output.recordset; 
    }
    catch (err) {
        console.error(err);
        return null;
    }
}