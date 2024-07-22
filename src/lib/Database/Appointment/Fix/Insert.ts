"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertFixData {
    EmployeeID: number;
    AppointmentID: number;
    Fix: string;
}

export default async function InsertFix(
    data: InsertFixData, 
    user: User = User.Employee
)
: Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('Fix', sql.VarChar, data.Fix)
            .output('FixID', sql.Int)
            .execute('Appointment.InsertFix');

        return output.output.FixID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}