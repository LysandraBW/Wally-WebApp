"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

interface InsertDiagnosisData {
    EmployeeID: number;
    AppointmentID: number;
    Code: string;
    Diagnosis: string;
}

export default async function InsertDiagnosis(
    data: InsertDiagnosisData, 
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('Code', sql.VarChar, data.Code)
            .input('Diagnosis', sql.VarChar, data.Diagnosis)
            .output('DiagnosisID', sql.Int)
            .execute('Appointment.InsertDiagnosis');

        return output.output.DiagnosisID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}