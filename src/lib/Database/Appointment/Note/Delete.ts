"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface DeleteNoteData {
    EmployeeID: number;
    AppointmentID: number;
    NoteID: number;
}

export default async function DeletePart(
    data: DeleteNoteData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw '';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('NoteID', sql.Int, data.NoteID)
            .execute('Appointment.DeleteNote');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}