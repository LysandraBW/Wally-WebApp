"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { SessionAppParameters } from "../../Parameters";
import { DB_AppointmentService } from "../../Types";

export default async function GetServices(
    data: SessionAppParameters, 
    user = User.Customer
): Promise<Array<DB_AppointmentService>> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetServices: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetServices');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}