"use server";
import sql from "mssql";
import { fetchPool } from "../../authentication/auth";
import { User } from "../../authentication/user";
import { InsertDefinedServiceParameters, InsertServiceParameters } from "../../define/parameters";

export async function InsertDefinedService(
    data: InsertDefinedServiceParameters, 
    user: User = User.Standard
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.InsertDefinedService: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('ServiceID', sql.Int, data.ServiceID)
            .execute('Appointment.InsertDefinedService');
 
        return output.recordset[0].ServiceID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

export async function InsertService(
    data: InsertServiceParameters, 
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Service', sql.VarChar(50), data.Service)
            .input('Division', sql.VarChar(50), data.Division)
            .input('Class', sql.VarChar(50), data.Class)
            .execute('Appointment.InsertService');
 
        return output.recordset[0].ServiceID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}