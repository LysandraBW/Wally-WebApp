"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetLabelsData {
    SessionID: string;
    AppointmentID: string;
}

export interface Label {
    LabelID: number;
    Label: string;
    Value: number;
}

export async function GetLabels(
    data: GetLabelsData, 
    user: User = User.Employee
): Promise<Array<Label> | null> {
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
        return null;
    }
}

interface GetEmployeeLabelsData {
    SessionID: string;
}

export async function GetEmployeeLabels(
    data: GetEmployeeLabelsData, 
    user: User = User.Employee
): Promise<Array<Label&{AppointmentID: string}> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetLabels: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .execute('Appointment.GetEmployeeLabels')

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}