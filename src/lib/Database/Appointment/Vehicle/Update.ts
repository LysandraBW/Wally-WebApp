"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateVehicleData {
    SessionID: string;
    AppointmentID: string;
    Make: string;
    Model: string;
    ModelYear: number;
    VIN: string;
    Mileage: number;
    LicensePlate: string;
}

export default async function UpdateVehicle(
    data: UpdateVehicleData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdateVehicle: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Make', sql.Int, data.Make)
            .input('Model', sql.Int, data.Model)
            .input('ModelYear', sql.Int, data.ModelYear)
            .input('VIN', sql.Int, data.VIN)
            .input('Mileage', sql.Int, data.Mileage)
            .input('LicensePlate', sql.Int, data.LicensePlate)
            .execute('Appointment.UpdateVehicle');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}