"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateLabelData {
    SessionID: string;
    AppointmentID: string;
    LabelID: number;
}

export default async function UpdateLabel(
    data: UpdateLabelData, 
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