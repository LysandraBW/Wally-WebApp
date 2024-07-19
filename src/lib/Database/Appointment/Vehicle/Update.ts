"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

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

export default async function UpdateVehicle(data: UpdateVehicleData) {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.UpdateVehicle", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}