"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

interface DeletePartData {
    EmployeeID: number;
    AppointmentID: number;
    PartID: number;
}

export default async function DeletePart(
    data: DeletePartData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('PartID', sql.Int, data.PartID)
            .execute('Appointment.DeletePart');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}