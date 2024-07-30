"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { DB_AppointmentLabel, DB_AllAppointmentLabels, DB_AppointmentLabels } from "../../Types";
import { SessionAppParameters, SessionParameter } from "../../Parameters";
import { sortAllAppointmentLabels, sortAppointmentLabels } from "./Helper";

export async function GetLabels(
    data: SessionAppParameters, 
    user: User = User.Employee
): Promise<DB_AppointmentLabels> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetLabels: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetLabels')

        const labels: Array<DB_AppointmentLabel> = output.recordset;
        const sortedLabels: DB_AppointmentLabels = sortAppointmentLabels(labels);

        return sortedLabels;   
    }
    catch (err) {
        console.error(err);
        return {};
    }
}

export async function GetAllLabels(
    data: SessionParameter, 
    user: User = User.Employee
): Promise<DB_AllAppointmentLabels> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetLabels: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .execute('Appointment.GetAllLabels')

        // Sorting Labels
        const labels: Array<DB_AppointmentLabel> = output.recordset;
        const sortedLabels: DB_AllAppointmentLabels = sortAllAppointmentLabels(labels);

        return sortedLabels;
    }
    catch (err) {
        console.error(err);
        return {};
    }
}