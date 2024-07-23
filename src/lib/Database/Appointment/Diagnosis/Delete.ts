"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface DeleteDiagnosisData {
    SessionID: string;
    AppointmentID: string;
    DiagnosisID: number;
}

export default async function DeleteDiagnosis(
    data: DeleteDiagnosisData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.DeleteDiagnosis: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('DiagnosisID', sql.Int, data.DiagnosisID)
            .execute('Appointment.DeleteDiagnosis');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}