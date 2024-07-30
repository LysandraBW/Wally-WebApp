"use server";
import sql from "mssql";
import { fetchPool } from "../Pool";
import { User } from "../User";
import { SessionParameter } from "../Parameters";
import { AuthenticateLookupParameters } from "../Parameters";

export async function AuthenticateLookup(
    data: AuthenticateLookupParameters, 
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

export async function AuthenticateSession(
    data: SessionParameter,
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