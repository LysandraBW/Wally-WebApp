"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertDiagnosisData {
    SessionID: string;
    AppointmentID: string;
    Code: string;
    Message: string;
}

export default async function InsertDiagnosis(
    data: InsertDiagnosisData, 
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.InsertDiagnosis: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Code', sql.VarChar, data.Code)
            .input('Message', sql.VarChar, data.Message)
            .execute('Appointment.InsertDiagnosis');

        return output.recordset[0].DiagnosisID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}