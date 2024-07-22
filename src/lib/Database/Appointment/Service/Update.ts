"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateServiceData {
    EmployeeID: number;
    AppointmentID: number;
    ServiceID: number;
    Service: string;
    GroupName: string;
    Type: string;
}

export default async function UpdateService(
    data: UpdateServiceData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('ServiceID', sql.Int, data.ServiceID)
            .input('Service', sql.Int, data.Service)
            .input('GroupName', sql.Int, data.GroupName)
            .input('Type', sql.Int, data.Type)
            .execute('Appointment.UpdateService');
    
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}