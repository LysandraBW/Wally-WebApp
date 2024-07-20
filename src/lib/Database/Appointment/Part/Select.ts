"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

interface GetPartsData {
    EmployeeID: number;
    AppointmentID: number;
}

interface Part {
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
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .execute('Appointment.GetParts')

        return output.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}