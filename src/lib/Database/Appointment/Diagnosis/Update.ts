"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateDiagnosisData {
    EmployeeID: number;
    AppointmentID: number;
    DiagnosisID: number;
    Code: string;
    Diagnosis: string;
}

export default async function UpdateDiagnosis(
    data: UpdateDiagnosisData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('DiagnosisID', sql.Int, data.DiagnosisID)
            .input('Code', sql.Int, data.Code)
            .input('Diagnosis', sql.Int, data.Diagnosis)
            .execute('Appointment.UpdateDiagnosis');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}