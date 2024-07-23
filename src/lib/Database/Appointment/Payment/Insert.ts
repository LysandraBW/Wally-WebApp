"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertPaymentData {
    SessionID: string;
    AppointmentID: string;
    Payment: string;
}

export async function InsertPayment(data: InsertPaymentData, user: User = User.Standard): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
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
    SessionID: string;
    AppointmentID: string;
    PaymentID: number;
    Name: string;
    Type: string;
    CNN: string;
    EXP: string;
}

export async function InsertCreditCard(
    data: InsertCreditCardData, 
    user: User = User.Standard
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('PaymentID', sql.Int, data.PaymentID)
            .input('Name', sql.VarChar(100), data.Name)
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