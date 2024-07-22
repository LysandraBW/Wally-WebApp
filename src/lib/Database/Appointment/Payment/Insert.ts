"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertPaymentData {
    EmployeeID: number;
    AppointmentID: number;
    Payment: string;
}

export async function InsertPayment(data: InsertPaymentData, user: User = User.Default)
: Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('Payment', sql.Money, data.Payment)
            .output('PaymentID', sql.Int)
            .execute('Appointment.InsertPayment');

        return output.output.PaymentID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}

interface InsertCreditCardData {
    EmployeeID: number;
    AppointmentID: number;
    PaymentID: number;
    Name: string;
    Type: string;
    CNN: string;
    EXP: string;
}

export async function InsertCreditCard(
    data: InsertCreditCardData, 
    user: User = User.Default
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('PaymentID', sql.Int, data.PaymentID)
            .input('Name', sql.VarChar, data.Name)
            .input('Type', sql.VarChar(4), data.Type)
            .input('CNN', sql.VarChar(3), data.CNN)
            .input('EXP', sql.VarChar(4), data.EXP)
            .execute('Appointment.InsertCreditCard');

        return true;   
    }
    catch (err) {
        console.error(err);
        return false;
    }
}