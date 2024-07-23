"use server";
import sql from "mssql";
import { fetchPool } from "../Pool";
import { User } from "../User";

interface UpdateCustomerData {
    SessionID: string;
    SessionID: string;
    AppointmentID: string;
    Phone: string;
}

export default async function UpdateCustomer(data: UpdateCustomerData, user: User = User.Employee): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Customer.UpdateCustomer: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('FName', sql.VarChar(50), data.FName)
            .input('LName', sql.VarChar(50), data.LName)
            .input('Email', sql.VarChar(320), data.Email)
            .input('Phone', sql.VarChar(15), data.Phone)
            .execute('Customer.UpdateCustomer');
            
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}