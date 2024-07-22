"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateLabelData {
    EmployeeID: number;
    AppointmentID: number;
    Label: string;
}

export default async function UpdateLabel(
    data: UpdateLabelData, 
    user = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('Label', sql.VarChar, data.Label)
            .execute('Appointment.UpdateLabel');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}