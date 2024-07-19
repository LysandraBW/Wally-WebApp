"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface GetEmployeeNotesData {
    EmployeeID: number;
    AppointmentID: number;
}

interface GetCustomerNotesData {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}

interface Note {
    NoteID: number;
    EmployeeID: number;
    AppointmentID: number;
    Head: string;
    Body: string;
    Attachment: string;
    ShowCustomer: number;
    CreationDate: string;
    UpdationDate: string;
}

export async function GetEmployeeNotesData(data: GetEmployeeNotesData)
: Promise<Array<Note> | null> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Appointment.GetEmployeeNotes", data));
        return res.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export async function GetCustomerNotesData(data: GetCustomerNotesData)
: Promise<Array<Note> | null> {
    try {
        await sql.connect(await config(ConfigType.Customer, data));
        const res = await sql.query(Query("EXEC Appointment.GetCustomerNotes", data));
        return res.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}