"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface GetNoteShareesData {
    NoteOwnerID: number;
    NoteID: number;
}

type NoteSharee = {
    ShareeFName: string;
    ShareeLName: string;
    ShareeID: number;
}

export default async function GetNoteSharees(data: GetNoteShareesData)
: Promise<Array<NoteSharee> | null> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Appointment.GetNoteSharees", data));
        return res.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}