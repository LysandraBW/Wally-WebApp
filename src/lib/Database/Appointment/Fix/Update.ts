"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateFixData {
    EmployeeID: number;
    AppointmentID: number;
    FixID: number;
    Fix: string;
}

export default async function UpdateFix(
    data: UpdateFixData, 
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
            .input('FixID', sql.Int, data.FixID)
            .input('Fix', sql.Int, data.Fix)
            .execute('Appointment.UpdateFix');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}