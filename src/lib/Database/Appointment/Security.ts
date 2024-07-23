"use server";
import sql from "mssql";
import { fetchPool } from "../Pool";
import { User } from "../User";

interface AuthenticateLookupData {
    AppointmentID: string;
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
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Email', sql.VarChar(320), data.Email)
            .output('SessionID', sql.Char(36))
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
    user: User = User.Standard
): Promise<string> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';
        

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .output('AppointmentID', sql.UniqueIdentifier)
            .execute('Appointment.AuthenticateSession');

        return output.output.AppointmentID;
    }
    catch (err) {
        console.error(err);
        return '';
    }
}