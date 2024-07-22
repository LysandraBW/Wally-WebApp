"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetEmployeeNotesData {
    EmployeeID: number;
    AppointmentID: number;
}

interface GetCustomerNotesData {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}

interface Note {
    NoteID: number;
    EmployeeID: number;
    AppointmentID: number;
    Head: string;
    Body: string;
    Attachment: string;
    ShowCustomer: number;
    CreationDate: string;
    UpdationDate: string;
}

export async function GetEmployeeNotesData(
    data: GetEmployeeNotesData, 
    user: User = User.Employee
): Promise<Array<Note> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .execute('Appointment.GetEmployeeNotes');

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export async function GetCustomerNotesData(
    data: GetCustomerNotesData, 
    user: User = User.Customer
): Promise<Array<Note> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        const output = await pool.request()
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('FName', sql.VarChar, data.FName)
            .input('LName', sql.VarChar, data.LName)
            .input('Email', sql.VarChar, data.Email)
            .execute('Appointment.GetCustomerNotes');

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}