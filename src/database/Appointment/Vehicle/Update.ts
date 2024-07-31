"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { UpdateVehicleParameters } from "../../Parameters";

export default async function UpdateVehicle(
    data: UpdateVehicleParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdateVehicle: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Make', sql.VarChar(50), data.Make)
            .input('Model', sql.VarChar(50), data.Model)
            .input('ModelYear', sql.Int, data.ModelYear)
            .input('VIN', sql.VarChar(17), data.VIN)
            .input('Mileage', sql.Int, data.Mileage)
            .input('LicensePlate', sql.VarChar(8), data.LicensePlate)
            .execute('Appointment.UpdateVehicle');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}