"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateCostData {
    SessionID: string;
    AppointmentID: string;
    Cost: string;
}

export default async function UpdateCost(
    data: UpdateCostData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdateCost: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Cost', sql.Int, data.Cost)
            .execute('Appointment.UpdateCost');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}