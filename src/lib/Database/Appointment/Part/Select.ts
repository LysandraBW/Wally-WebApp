"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface GetPartsData {
    SessionID: string;
    AppointmentID: string;
}

export interface Part {
    PartID: number;
    PartName: string;
    PartNumber: string;
    Quantity: string;
    UnitCost: string;
}

export default async function GetParts(
    data: GetPartsData, 
    user: User = User.Employee
): Promise<Array<Part> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetParts: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetParts')

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}