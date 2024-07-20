"use server";
import sql from "mssql";
import { User, fetchPool } from "../Pool";

interface UpdateCustomerData {
    EmployeeID: number;
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
}

export default async function UpdateCustomer(data: UpdateCustomerData, user: User = User.Employee)
: Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Error';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
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