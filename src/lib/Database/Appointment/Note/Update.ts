"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface UpdateNoteData {
    NoteOwnerID: number;
    AppointmentID: number;
    NoteID: number;
    Head: string;
    Body: string;
    Attachment: string;
    ShowCustomer: number;
}

export default async function UpdateNote(data: UpdateNoteData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.UpdateNote", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}