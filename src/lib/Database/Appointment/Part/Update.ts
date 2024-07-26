"use server";
import sql from "mssql";
import { User } from "../../User";
import { fetchPool } from "../../Pool";
import { UpdatePartParameters } from "../../Parameters";

export default async function UpdatePart(
    data: UpdatePartParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.UpdatePart: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .input('PartID', sql.Int, data.PartID)
            .input('PartName', sql.VarChar(50), data.PartName)
            .input('PartNumber', sql.VarChar(50), data.PartNumber)
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