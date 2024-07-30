"use server";
import sql from "mssql";
import { User } from "../../User";
import { fetchPool } from "../../Pool";
import { UpdateLabelParameters } from "../../Parameters";

export default async function UpdateLabel(
    data: UpdateLabelParameters, 
    user = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdateLabel: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('LabelID', sql.Int, data.LabelID)
            .execute('Appointment.UpdateLabel');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}