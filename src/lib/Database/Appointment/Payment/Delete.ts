"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

interface DeletePaymentData {
    EmployeeID: number;
    AppointmentID: number;
    PaymentID: number;
}

export default async function DeletePayment(
    data: DeletePaymentData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('PaymentID', sql.Int, data.PaymentID)
            .execute('Appointment.DeletePayment');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}