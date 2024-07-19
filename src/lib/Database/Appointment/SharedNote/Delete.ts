"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface DeleteNoteShareeData {
    NoteOwnerID: number;
    NoteID: number;
    NoteShareeID: number;
}

export default async function DeleteNoteSharee(data: DeleteNoteShareeData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.DeleteNoteSharee", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}