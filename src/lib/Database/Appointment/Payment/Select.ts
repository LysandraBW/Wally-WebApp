"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetPaymentData {
    SessionID: string;
    AppointmentID: string;
}

export type Payment = {
    AppointmentID: string;
    PaymentID: number;
    Payment: string;
    PaymentDate: string;
    Name: string;
    Type: string;
    CCN: string;
    EXP: string;
}

export default async function GetPayments(
    data: GetPaymentData, 
    user: User = User.Employee
): Promise<Array<Payment> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetPayment: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetPayments');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}