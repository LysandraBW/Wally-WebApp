"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { SessionAppParameters } from "../../Parameters";
import { DB_Attachment, DB_EmployeeNote, DB_Note } from "../../Types";

export async function sortNoteAttachments(notes: Array<DB_Note>, attachments: Array<DB_Attachment>) {
    const sortedAttachments: {[noteID: number]: Array<DB_Attachment>} = {};
        
    for (const attachment of attachments) {
        if (!sortedAttachments[attachment.NoteID])
            sortedAttachments[attachment.NoteID] = [];
        sortedAttachments[attachment.NoteID].push(attachment);
    }

    for (let i = 0; i < notes.length; i++) {
        notes[i].Attachments = sortedAttachments[notes[i].NoteID];
    }
}

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

        const notes: Array<DB_EmployeeNote> = recordsets[0];
        const attachments: Array<DB_Attachment> = recordsets[1];
        sortNoteAttachments(notes, attachments);
    
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

        const notes: Array<DB_EmployeeNote> = recordsets[0];
        const attachments: Array<DB_Attachment> = recordsets[1];
        sortNoteAttachments(notes, attachments);
    
        return notes;    
    }
    catch (err) {
        console.error(err);
        return [];
    }
}