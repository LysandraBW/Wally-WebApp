"use server";
import sql from "mssql";
import { fetchPool } from "../Pool";
import { User } from "../User";

interface InsertAppointmentData {
    SessionID:  number | null;
    FName:      string;
    LName:      string;
    Email:      string;
    Phone:      string;
    Make:       string;
    Model:      string;
    ModelYear:  number;
    VIN:        string | null;
}

export default async function InsertAppointment(
    data: InsertAppointmentData, 
    user: User = User.Standard
): Promise<string> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.InsertAppointment: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('FName', sql.VarChar(50), data.FName)
            .input('LName', sql.VarChar(50), data.LName)
            .input('Email', sql.VarChar(320), data.Email)
            .input('Phone', sql.VarChar(25), data.Phone)
            .input('Make', sql.VarChar(50), data.Make)
            .input('Model', sql.VarChar(50), data.Model)
            .input('ModelYear', sql.Int, data.ModelYear)
            .input('VIN', sql.VarChar(17), data.VIN)
            .execute('Appointment.InsertAppointment');

        return output.recordset[0].AppointmentID;
    }
    catch (err) {
        console.error(err);
        return '';
    }
}