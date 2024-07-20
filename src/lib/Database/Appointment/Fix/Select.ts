"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

interface GetFixesData {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}

export interface Fix {
    FixID: number;
    Fix: string;
}

export default async function GetFixes(
    data: GetFixesData, 
    user: User = User.Customer
)
: Promise<Array<Fix> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        const output = await pool.request()
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('FName', sql.VarChar, data.FName)
            .input('LName', sql.VarChar, data.LName)
            .input('Email', sql.VarChar, data.Email)
            .execute('Appointment.GetFixes');

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}