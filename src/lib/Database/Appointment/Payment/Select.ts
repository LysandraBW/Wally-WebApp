"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetPaymentData {
    EmployeeID: number;
    AppointmentID: number;
}

type Payment = {
    AppointmentID: number;
    PaymentID: number;
    Payment: string;
    PaymentDate: string;
    Name: string;
    Type: string;
    CCN: string;
    EXP: string;
}

export default async function GetPayment(
    data: GetPaymentData, 
    user: User = User.Employee
): Promise<Array<Payment> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .execute('Appointment.GetPayment');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}