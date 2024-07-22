"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertPartData {
    EmployeeID: number;
    AppointmentID: number;
    PartName: string;
    PartNumber: string;
    Quantity: number;
    UnitCost: string;
}

export default async function InsertPart(
    data: InsertPartData, 
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('PartName', sql.VarChar, data.PartName)
            .input('PartNumber', sql.Int, data.PartNumber)
            .input('Quantity', sql.Int, data.Quantity)
            .input('UnitCost', sql.Money, data.UnitCost)
            .output('PartID', sql.Int)
            .execute('Appointment.InsertParts');
 
        return output.output.PartID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}