"use server";
import sql from "mssql";
import { User } from "../../User";
import { fetchPool } from "../../Pool";
import { InsertPartParameters } from "../../Parameters";

export default async function InsertPart(
    data: InsertPartParameters, 
    user: User = User.Employee
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.InsertPart: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('PartName', sql.VarChar(50), data.PartName)
            .input('PartNumber', sql.VarChar(50), data.PartNumber)
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