"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface DeleteFixData {
    EmployeeID: number;
    AppointmentID: number;
    FixID: number;
}

export default async function DeleteFix(
    data: DeleteFixData, 
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
            .execute('Appointment.DeleteFix');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}