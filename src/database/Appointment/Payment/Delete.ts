"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { DeletePaymentParameters } from "../../Parameters";

export default async function DeletePayment(
    data: DeletePaymentParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('PaymentID', sql.Int, data.PaymentID)
            .execute('Appointment.DeletePayment');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}