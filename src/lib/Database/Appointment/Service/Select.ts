"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetServicesData {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}

export type Service = {
    ServiceID: number;
    AppointmentID: number;
    Type: string;
    GroupName: string;
    Service: string;
}

export default async function GetServices(
    data: GetServicesData, 
    user = User.Customer
): Promise<Array<Service> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
        .input('AppointmentID', sql.Int, data.AppointmentID)
        .input('FName', sql.VarChar(50), data.FName)
        .input('LName', sql.VarChar(50), data.LName)
        .input('Email', sql.VarChar(320), data.Email)
        .execute('Appointment.GetServices');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}