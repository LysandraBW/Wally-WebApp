"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface Data {
    SessionID: string;
    AppointmentID: string;
}

export async function Delete(
    data: Data, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.Delete: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.Remove');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export async function Restore(data: Data, user: User = User.Employee): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.Restore: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.PutBack');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}