"use server";
import sql from "mssql";
import { fetchPool } from "../../authentication/auth";
import { User } from "../../authentication/user";
import { UpdateDiagnosisParameters } from "../../define/parameters";

export default async function UpdateDiagnosis(
    data: UpdateDiagnosisParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdateDiagnosis: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('DiagnosisID', sql.Int, data.DiagnosisID)
            .input('Code', sql.VarChar(20), data.Code)
            .input('Message', sql.VarChar(500), data.Message)
            .execute('Appointment.UpdateDiagnosis');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}