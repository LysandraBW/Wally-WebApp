"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateCostData {
    EmployeeID: number;
    AppointmentID: number;
    Cost: string;
}

export default async function UpdateCost(
    data: UpdateCostData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('Cost', sql.Int, data.Cost)
            .execute('Appointment.UpdateCost');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}