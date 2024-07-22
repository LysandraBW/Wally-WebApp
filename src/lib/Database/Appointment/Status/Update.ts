"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateStatusData {
    EmployeeID: number;
    AppointmentID: number;
    StatusID: number;
}

export default async function UpdateStatus(
    data: UpdateStatusData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('StatusID', sql.Int, data.StatusID)
            .execute('Appointment.UpdateStatus');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}