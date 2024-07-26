"use server";
import sql from "mssql";
import { User } from "../../User";
import { fetchPool } from "../../Pool";
import { SessionAppParameters } from "../../Parameters";
import { DB_Diagnosis } from "../../Types";

export default async function GetDiagnoses(
    data: SessionAppParameters, 
    user: User = User.Employee
): Promise<Array<DB_Diagnosis>> {
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
        return [];
    }
}