"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetRepairsData {
    SessionID: string;
    AppointmentID: string;
}

export interface Repair {
    RepairID: number;
    Repair: string;
}

export default async function GetRepairs(
    data: GetRepairsData, 
    user: User = User.Customer
): Promise<Array<Repair> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetRepairs: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetRepairs');

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}