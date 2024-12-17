"use server";
import sql from "mssql";
import { User } from "../../authentication/user";
import { fetchPool } from "../../authentication/auth";
import { DeleteDiagnosisParameters } from "../../define/parameters";

export default async function DeleteDiagnosis(
    data: DeleteDiagnosisParameters, 
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