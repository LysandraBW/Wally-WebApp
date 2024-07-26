"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { InsertCreditCardParameters, InsertPaymentParameters } from "../../Parameters";

export async function InsertPayment(
    data: InsertPaymentParameters, 
    user: User = User.Standard
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Payment', sql.Money, data.Payment)
            .execute('Appointment.InsertPayment');

        return output.recordset[0].PaymentID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}

export async function InsertCreditCard(
    data: InsertCreditCardParameters, 
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