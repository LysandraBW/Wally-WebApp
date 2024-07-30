"use server";
import sql from "mssql";
import { User } from "../../User";
import { DB_Part } from "../../Types";
import { fetchPool } from "../../Pool";
import { SessionAppParameters } from "../../Parameters";

export default async function GetParts(
    data: SessionAppParameters, 
    user: User = User.Employee
): Promise<Array<DB_Part>> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetParts: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetParts')

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return [];
    }
}