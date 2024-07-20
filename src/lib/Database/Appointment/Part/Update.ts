"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

interface UpdatePartData {
    EmployeeID: number;
    AppointmentID: number;
    PartID: number;
    PartName: string;
    PartNumber: string;
    Quantity: number;
    UnitCost: string;
}

export default async function UpdatePart(
    data: UpdatePartData, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('PartID', sql.Int, data.PartID)
            .input('PartName', sql.VarChar, data.PartName)
            .input('PartNumber', sql.VarChar, data.PartNumber)
            .input('Quantity', sql.Int, data.Quantity)
            .input('UnitCost', sql.Money, data.UnitCost)
            .execute('Appointment.UpdatePart');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}