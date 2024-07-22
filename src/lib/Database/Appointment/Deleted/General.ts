"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface Data {
    EmployeeID: number;
    AppointmentID: number;
}

export async function Remove(
    data: Data, 
    user: User = User.Employee
)
: Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .execute('Appointment.Remove');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export async function Restore(data: Data, user: User = User.Employee)
: Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .execute('Appointment.PutBack');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}