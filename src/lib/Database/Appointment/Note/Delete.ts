"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface DeleteNoteData {
    EmployeeID: number;
    AppointmentID: number;
    NoteID: number;
}

export default async function DeletePart(data: DeleteNoteData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.DeleteNote", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}