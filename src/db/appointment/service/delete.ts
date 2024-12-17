"use server";
import sql from "mssql";
import { fetchPool } from "../../authentication/auth";
import { User } from "../../authentication/user";
import { DeleteServiceParameters } from "../../define/parameters";

export default async function DeleteService(
    data: DeleteServiceParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.DeleteService: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('ServiceID', sql.Int, data.ServiceID)
            .execute('Appointment.DeleteService');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}