"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface UpdatePartData {
    SessionID: string;
    AppointmentID: string;
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
            throw 'Appointment.UpdatePart: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
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