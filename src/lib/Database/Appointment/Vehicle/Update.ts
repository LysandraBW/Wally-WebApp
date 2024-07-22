"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdateVehicleData {
    EmployeeID: number;
    AppointmentID: number;
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
            throw 'Undefined Pool';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
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