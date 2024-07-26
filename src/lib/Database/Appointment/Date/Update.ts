'use server';
import sql from "mssql";
import { User } from "../../User";
import { fetchPool } from "../../Pool";
import { UpdateDateParameters } from "../../Parameters";

export default async function UpdateDate(
    data: UpdateDateParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdateDate: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('StartDate', sql.VarChar(30), data.StartDate)
            .input('EndDate', sql.VarChar(30), data.EndDate)
            .execute('Appointment.UpdateDate');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}