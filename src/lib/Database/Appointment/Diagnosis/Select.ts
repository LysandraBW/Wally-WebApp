"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetDiagnosisData {
    SessionID: string;
    AppointmentID: string;
}

export interface Diagnosis {
    DiagnosisID: number;
    Code: string;
    Message: string;
}

export default async function GetDiagnoses(
    data: GetDiagnosisData, 
    user: User = User.Employee
): Promise<Array<Diagnosis> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetDiagnoses: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetDiagnoses');

        return output.recordset; 
    }
    catch (err) {
        console.error(err);
        return null;
    }
}