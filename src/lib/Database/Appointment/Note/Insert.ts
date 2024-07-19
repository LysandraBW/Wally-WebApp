"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface InsertNoteData {
    EmployeeID: number;
    AppointmentID: number;
    Head: string;
    Body: string;
    Attachment: string;
    ShowCustomer: number;
}

export default async function InsertNote(data: InsertNoteData)
: Promise<number> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Appointment.InsertNote", data));
        return res.recordset[0].NoteID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}