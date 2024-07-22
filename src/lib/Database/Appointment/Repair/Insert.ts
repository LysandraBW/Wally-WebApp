"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertRepairData {
    SessionID: string;
    AppointmentID: string;
    Repair: string;
}

export default async function InsertRepair(
    data: InsertRepairData, 
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.InsertRepair: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Repair', sql.VarChar, data.Repair)
            .execute('Appointment.InsertRepair');

        return output.recordset[0].ServiceID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}