"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

interface DeleteDiagnosisData {
    EmployeeID: number;
    AppointmentID: number;
    DiagnosisID: number;
}

export default async function DeleteDiagnosis(
    data: DeleteDiagnosisData, 
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
            .execute('Appointment.DeleteDiagnosis');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}