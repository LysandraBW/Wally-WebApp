"use server";
import sql from "mssql";
import { User } from "../../User";
import { DB_Repair } from "../../Types";
import { fetchPool } from "../../Pool";
import { SessionAppParameters } from "../../Parameters";

export default async function GetRepairs(
    data: SessionAppParameters, 
    user: User = User.Customer
): Promise<Array<DB_Repair>> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetRepairs: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetRepairs');

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return [];
    }
}