"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { InsertDefinedServiceParameters, InsertServiceParameters } from "../../Parameters";

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
            .input('Service', sql.Int, data.Service)
            .input('Division', sql.Int, data.Division)
            .input('Class', sql.Int, data.Class)
            .execute('Appointment.InsertService');
 
        return output.recordset[0].ServiceID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}