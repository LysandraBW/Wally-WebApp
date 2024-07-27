"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { DB_EmployeeLabel, DB_AppointmentLabel, DB_EmployeeLabels } from "../../Types";
import { GetAllLabelsParameters, SessionAppParameters } from "../../Parameters";
import { sortLabels } from "./Helper";

export async function GetLabels(
    data: SessionAppParameters, 
    user: User = User.Employee
): Promise<Array<DB_AppointmentLabel>> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetLabels: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetLabels')

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export async function GetAllLabels(
    data: GetAllLabelsParameters, 
    user: User = User.Employee
): Promise<DB_EmployeeLabels> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetLabels: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .execute('Appointment.GetAllLabels')

        const labels: Array<DB_EmployeeLabel> = output.recordset;
        const sortedLabels: DB_EmployeeLabels = await sortLabels(labels);

        return sortedLabels;   
    }
    catch (err) {
        console.error(err);
        return {};
    }
}