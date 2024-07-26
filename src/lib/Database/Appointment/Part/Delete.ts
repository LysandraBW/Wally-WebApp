"use server";
import sql from "mssql";
import { User } from "../../User";
import { fetchPool } from "../../Pool";
import { DeletePartParameters } from "../../Parameters";

export default async function DeletePart(
    data: DeletePartParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.DeletePart: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('PartID', sql.Int, data.PartID)
            .execute('Appointment.DeletePart');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}