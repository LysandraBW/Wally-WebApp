import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getEmployeePool } from "../../../connectionPool.js";
import { isString, isInteger, isVIN } from "../../../validation/effect.js";
import { appointmentKeySchema } from "../../../validation/schema.js";

export async function execUpdateVehicle(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Make', sql.VarChar(50), data.make)
            .input('Model', sql.VarChar(50), data.model)
            .input('ModelYear', sql.Int, data.modelYear)
            .input('VIN', sql.VarChar(17), data.vin)
            .input('Mileage', sql.Int, data.mileage)
            .input('LicensePlate', sql.VarChar(8), data.licensePlate)
            .execute('Appointment.UpdateVehicle');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdateVehicle = z.object({
    ...appointmentKeySchema,
    make: isString.max(50).or(z.null()),
    model: isString.max(50).or(z.null()),
    modelYear: isInteger.or(z.null()),
    vin: isVIN.or(z.null()),
    mileage: isInteger.or(z.null()),
    licensePlate: isString.max(8).or(z.null())
});

export const updateVehicle = {
    test: (input) => testUpdateVehicle.safeParse(input),
    exec: (input) => execUpdateVehicle(input)
}