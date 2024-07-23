"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetEmployeeNotesData {
    SessionID: string;
    AppointmentID: string;
}

interface GetCustomerNotesData {
    SessionID: string;
    AppointmentID: string;
}

export interface Note {
    NoteID: number;
    EmployeeID: number;
    AppointmentID: string;
    Head: string;
    Body: string;
    Attachment: string;
    ShowCustomer: number;
    CreationDate: string;
    UpdationDate: string;
}

export async function GetEmployeeNotes(
    data: GetEmployeeNotesData, 
    user: User = User.Employee
): Promise<Array<Note> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetEmployeeNotes: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetEmployeeNotes');

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export async function GetCustomerNotes(
    data: GetCustomerNotesData, 
    user: User = User.Customer
): Promise<Array<Note> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetCustomerNotes: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetCustomerNotes');

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}