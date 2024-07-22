"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface DeleteRepairData {
    SessionID: string;
    AppointmentID: string;
    RepairID: number;
}

export default async function DeleteRepair(
    data: DeleteRepairData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.DeleteRepair: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
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