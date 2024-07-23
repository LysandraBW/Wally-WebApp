"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateRepairData {
    SessionID: string;
    AppointmentID: string;
    RepairID: number;
    Repair: string;
}

export default async function UpdateRepair(
    data: UpdateRepairData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdateRepair: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('RepairID', sql.Int, data.RepairID)
            .input('Repair', sql.Int, data.Repair)
            .execute('Appointment.UpdateRepair');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}