"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { UpdateCostParameters } from "../../Parameters";

export default async function UpdateCost(
    data: UpdateCostParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdateCost: Undefined Pool';

        console.log(data);
        
        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Cost', sql.Float, data.Cost)
            .execute('Appointment.UpdateCost');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}