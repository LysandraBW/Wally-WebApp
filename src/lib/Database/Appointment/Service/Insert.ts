"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertDefinedServiceData {
    EmployeeID: number | null;
    AppointmentID: number;
    ServiceID: number;
    FName: string | null;
    LName: string | null;
    Email: string | null;
}

export async function InsertDefinedService(data: InsertDefinedServiceData, user: User = User.Default)
: Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('ServiceID', sql.Int, data.ServiceID)
            .input('FName', sql.Int, data.FName)
            .input('LName', sql.Int, data.LName)
            .input('Email', sql.Int, data.Email)
            .output('ServiceID', sql.Int)
            .execute('Appointment.InsertDefinedService');
 
        return output.output.ServiceID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

interface InsertServiceData {
    EmployeeID: number;
    AppointmentID: number;
    ServiceID: string;
    Service: string;
    Group: string;
    Type: string;
}

export async function InsertService(
    data: InsertServiceData, 
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('ServiceID', sql.Int, data.ServiceID)
            .input('Service', sql.Int, data.Service)
            .input('Group', sql.Int, data.Group)
            .input('Type', sql.Int, data.Type)
            .output('ServiceID', sql.Int)
            .execute('Appointment.InsertService');
 
        return output.output.ServiceID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}