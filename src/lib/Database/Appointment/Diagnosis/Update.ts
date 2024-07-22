"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateDiagnosisData {
    SessionID: string;
    AppointmentID: string;
    DiagnosisID: number;
    Code: string;
    Message: string;
}

export default async function UpdateDiagnosis(
    data: UpdateDiagnosisData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdateDiagnosis: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('DiagnosisID', sql.Int, data.DiagnosisID)
            .input('Code', sql.Int, data.Code)
            .input('Message', sql.Int, data.Message)
            .execute('Appointment.UpdateDiagnosis');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}