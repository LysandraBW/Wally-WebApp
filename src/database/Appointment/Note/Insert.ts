"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { InsertNoteAttachmentParameters, InsertNoteParameters } from "../../Parameters";

export async function InsertNote(
    data: InsertNoteParameters, 
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.InsertNote: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('Head', sql.VarChar(100), data.Head)
            .input('Body', sql.VarChar(500), data.Body)
            .input('ShowCustomer', sql.Bit, data.ShowCustomer)
            .execute('Appointment.InsertNote');

        return output.recordset[0].NoteID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}

export async function InsertNoteAttachment(
    data: InsertNoteAttachmentParameters,
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.InsertNote: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('NoteID', sql.Int, data.NoteID)
            .input('Name', sql.VarChar(100), data.Name)
            .input('Type', sql.VarChar(100), data.Type)
            .input('URL', sql.VarChar(500), data.URL)
            .execute('Appointment.InsertNoteAttachment');

        return output.recordset[0].AttachmentID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}