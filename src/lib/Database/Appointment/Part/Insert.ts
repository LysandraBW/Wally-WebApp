"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertPartData {
    SessionID: string;
    AppointmentID: string;
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
            throw 'Appointment.InsertPart: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('PartName', sql.VarChar, data.PartName)
            .input('PartNumber', sql.Int, data.PartNumber)
            .input('Quantity', sql.Int, data.Quantity)
            .input('UnitCost', sql.Money, data.UnitCost)
            .execute('Appointment.InsertPart');
 
        return output.recordset[0].PartID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}