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

export interface Attachment {
    URL: string;
    Name: string;
    NoteID: number;
    AttachmentID: number;
}

export interface Note {
    NoteID: number;
    EmployeeID: number;
    AppointmentID: string;
    Head: string;
    Body: string;
    ShowCustomer: number;
    CreationDate: string;
    UpdationDate: string;
}

export async function GetEmployeeNotes(
    data: GetEmployeeNotesData, 
    user: User = User.Employee
): Promise<Array<Note&{
    OwnerFName: string;
    OwnerLName: string;
    OwnerID: string;
}> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetEmployeeNotes: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetEmployeeNotes');

        const recordsets = <sql.IRecordSet<any>> output.recordsets;

        return {
            ...recordsets[0][0],
            Attachments: recordsets[1]
        };   
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

        const recordsets = <sql.IRecordSet<any>> output.recordsets;

        return {
            ...recordsets[0][0],
            Attachments: recordsets[1]
        };      
    }
    catch (err) {
        console.error(err);
        return null;
    }
}