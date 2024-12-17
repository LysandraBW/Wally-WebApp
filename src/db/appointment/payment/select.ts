"use server";
import sql from "mssql";
import { fetchPool } from "../../authentication/auth";
import { User } from "../../authentication/user";
import { SessionAppParameters } from "../../define/parameters";
import { DB_Payment } from "../../define/interfaces";

export default async function GetPayments(
    data: SessionAppParameters, 
    user: User = User.Employee
): Promise<Array<DB_Payment>> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetPayment: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetPayments');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}