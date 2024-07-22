"use server";
import sql from "mssql";
import { fetchPool } from "../Pool";
import { User } from "../User";

interface AuthenticateLookupData {
    LastDigits: string;
    Email: string;
}

export async function AuthenticateLookup(
    data: AuthenticateLookupData, 
    user: User = User.Standard
): Promise<string> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('LastDigits', sql.Int, data.LastDigits)
            .input('Email', sql.VarChar(320), data.Email)
            .output('SessionID', sql.VarBinary)
            .output('AppointmentID', sql.UniqueIdentifier)
            .execute('Appointment.AuthenticateLookup');

        return output.output.SessionID;
    }
    catch (err) {
        console.error(err);
        return '';
    }
}

interface AuthenticateSessionData {
    SessionID: string;
}

export async function AuthenticateSession(
    data: AuthenticateSessionData,
    user: User = User.Customer
): Promise<string> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .output('AppointmentID', sql.UniqueIdentifier)
            .execute('Appointment.AuthenticateLookup');

        return output.output.AppointmentID;
    }
    catch (err) {
        console.error(err);
        return '';
    }
}