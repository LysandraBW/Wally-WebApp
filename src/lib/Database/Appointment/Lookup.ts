"use server";
import sql from "mssql";
import { User, fetchPool } from "../Pool";

interface AuthenticateLookupData {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}

export default async function AuthenticateLookup(
    data: AuthenticateLookupData, 
    user: User = User.Default
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('FName', sql.VarChar(50), data.FName)
            .input('LName', sql.VarChar(50), data.LName)
            .input('Email', sql.VarChar(320), data.Email)
            .execute('Appointment.AuthenticateLookup');

        return output.recordset[0].Found === 1;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}