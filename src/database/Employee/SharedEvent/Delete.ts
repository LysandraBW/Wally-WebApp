"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";
import { MutateEventShareeParameters } from "../../Parameters";

export default async function DeleteEventSharee(
    data: MutateEventShareeParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.DeleteEventSharee: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('EventID', sql.Int, data.EventID)
            .input('EventShareeID', sql.Int, data.EventShareeID)
            .execute('Employee.DeleteEventShare');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}