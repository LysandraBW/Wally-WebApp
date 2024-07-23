"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetServicesData {
    SessionID: string;
    AppointmentID: string;
}

export type Service = {
    ServiceID: number;
    AppointmentID: string;
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
            throw 'Appointment.GetServices: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetServices');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}