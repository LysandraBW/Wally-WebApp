"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface DeleteServiceData {
    SessionID: string;
    AppointmentID: string;
    ServiceID: number;
}

export default async function DeleteService(
    data: DeleteServiceData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.DeleteService: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
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