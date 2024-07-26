"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface DeleteNoteData {
    SessionID: string;
    AppointmentID: string;
    NoteID: number;
}

export default async function DeleteNote(
    data: DeleteNoteData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.DeleteNote: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('NoteID', sql.Int, data.NoteID)
            .execute('Appointment.DeleteNote');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

interface DeleteNoteAttachmentData {
    SessionID: string;
    NoteID: number;
    AttachmentID: number
}

export async function DeleteNoteAttachment (
    data: DeleteNoteAttachmentData,
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.DeleteNote: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AttachmentID', sql.UniqueIdentifier, data.AttachmentID)
            .input('NoteID', sql.Int, data.NoteID)
            .execute('Appointment.DeleteNoteAttachment');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}