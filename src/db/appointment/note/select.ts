"use server";
import sql from "mssql";
import { fetchPool } from "../../authentication/auth";
import { User } from "../../authentication/user";
import { SessionAppParameters } from "../../define/parameters";
import { DB_Attachment, DB_EmployeeNote, DB_Note } from "../../define/interfaces";
import { attachAttachments } from "./helper";

export async function GetEmployeeNotes(
    data: SessionAppParameters, 
    user: User = User.Employee
): Promise<Array<DB_EmployeeNote>> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetEmployeeNotes: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetEmployeeNotes');

        const recordsets = <sql.IRecordSet<any>> output.recordsets;
        
        // Attaching Attachments to Notes In-Place
        const notes: Array<DB_EmployeeNote> = recordsets[0];
        const attachments: Array<DB_Attachment> = recordsets[1];
        await attachAttachments(notes, attachments);
    
        return notes;   
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export async function GetCustomerNotes(
    data: SessionAppParameters, 
    user: User = User.Customer
): Promise<Array<DB_Note>> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetCustomerNotes: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetCustomerNotes');

        const recordsets = <sql.IRecordSet<any>> output.recordsets;

        // Attaching Attachments to Notes In-Place
        const notes: Array<DB_EmployeeNote> = recordsets[0];
        const attachments: Array<DB_Attachment> = recordsets[1];
        attachAttachments(notes, attachments);
    
        return notes;    
    }
    catch (err) {
        console.error(err);
        return [];
    }
}