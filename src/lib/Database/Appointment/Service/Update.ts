"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateServiceData {
    SessionID: string;
    AppointmentID: string;
    ServiceID: number;
    Service: string;
    Division: string;
    Class: string;
}

export default async function UpdateService(
    data: UpdateServiceData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdateService: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('ServiceID', sql.Int, data.ServiceID)
            .input('Service', sql.Int, data.Service)
            .input('Division', sql.Int, data.Division)
            .input('Class', sql.Int, data.Class)
            .execute('Appointment.UpdateService');
    
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}