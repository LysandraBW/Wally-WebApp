"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateStatusData {
    SessionID: string;
    AppointmentID: string;
    StatusID: number;
}

export default async function UpdateStatus(
    data: UpdateStatusData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.Status: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('StatusID', sql.Int, data.StatusID)
            .execute('Appointment.UpdateStatus');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}