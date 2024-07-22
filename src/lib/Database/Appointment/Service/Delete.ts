"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface DeleteServiceData {
    EmployeeID: number;
    AppointmentID: number;
    ServiceID: number;
}

export default async function DeleteService(
    data: DeleteServiceData, 
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
            .execute('Appointment.DeleteService');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}