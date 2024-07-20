"use server";
import sql from "mssql";
import { User, fetchPool } from "../Pool";

interface InsertAppointmentData {
    EmployeeID: number | null;
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
    user: User = User.Default
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('FName', sql.Int, data.FName)
            .input('LName', sql.Int, data.LName)
            .input('Email', sql.Int, data.Email)
            .input('Phone', sql.Int, data.Phone)
            .input('Make', sql.Int, data.Make)
            .input('Model', sql.Int, data.Model)
            .input('ModelYear', sql.Int, data.ModelYear)
            .input('VIN', sql.Int, data.VIN)
            .output('AppointmentID', sql.Int)
            .execute('Appointment.InsertAppointment');

        return output.output.AppointmentID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}