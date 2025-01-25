import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getStandardPool } from "../../../connectionPool.js";
import { isName, isEmail, isPhone, hasLength, isInteger, isIntArray, isVIN, isCommaJoinedIntArray } from "../../../validation/effect.js";

export async function execInsertAppointment(data) {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("FName", sql.VarChar(50), data.fName)
            .input("LName", sql.VarChar(50), data.lName)
            .input("Email", sql.VarChar(320), data.email)
            .input("Phone", sql.VarChar(25), data.phone)
            .input("Make", sql.VarChar(50), data.make)
            .input("Model", sql.VarChar(50), data.model)
            .input("ModelYear", sql.Int, data.modelYear)
            .input("VIN", sql.VarChar(17), data.vin)
            .input("Services", sql.VarChar(1000), data.services)
            .execute("Appointment.InsertAppointment");

        return output.recordset[0].AppointmentID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

export const testInsertAppointment = z.object({
    fName: isName,
    lName: isName,
    email: isEmail,
    phone: isPhone,
    make: hasLength,
    model: hasLength,
    modelYear: isInteger,
    services: isCommaJoinedIntArray,
    vin: isVIN.optional()
});

export const insertAppointment = {
    test: (input) => testInsertAppointment.safeParse(input),
    exec: (input) => execInsertAppointment(input)
}