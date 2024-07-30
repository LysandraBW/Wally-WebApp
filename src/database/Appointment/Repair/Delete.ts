"use server";
import sql from "mssql";
import { User } from "../../User";
import { fetchPool } from "../../Pool";
import { DeleteRepairParameters } from "../../Parameters";

export default async function DeleteRepair(
    data: DeleteRepairParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.DeleteRepair: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('RepairID', sql.Int, data.RepairID)
            .execute('Appointment.DeleteRepair');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}