"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateDateData {
    EmployeeID: number;
    AppointmentID: number;
    StartDate: string;
    EndDate: string;
}

export default async function UpdateDate(
    data: UpdateDateData, 
    user: User = User.Employee
)
: Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('StartDate', sql.VarChar, data.StartDate)
            .input('EndDate', sql.VarChar, data.EndDate)
            .execute('Appointment.UpdateDate');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}