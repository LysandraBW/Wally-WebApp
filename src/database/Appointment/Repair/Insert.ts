"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { InsertRepairParameters } from "../../Parameters";

export default async function InsertRepair(
    data: InsertRepairParameters, 
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.InsertRepair: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Repair', sql.VarChar(300), data.Repair)
            .execute('Appointment.InsertRepair');

        return output.recordset[0].ServiceID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}