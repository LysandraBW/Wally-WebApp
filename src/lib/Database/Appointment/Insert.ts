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
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('FName', sql.Int, data.FName)
            .input('LName', sql.Int, data.LName)
            .input('Email', sql.Int, data.Email)
            .input('Phone', sql.Int, data.Phone)
            .input('Make', sql.Int, data.Make)
            .input('Model', sql.Int, data.Model)
            .input('ModelYear', sql.Int, data.ModelYear)
            .input('VIN', sql.Int, data.VIN)
            .execute('Appointment.InsertAppointment');

        return output.recordset[0].AppointmentID;
    }
    catch (err) {
        console.error(err);
        return '';
    }
}