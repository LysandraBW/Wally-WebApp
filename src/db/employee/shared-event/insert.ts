"use server";
import sql from "mssql";
import { fetchPool } from "../../authentication/auth";
import { User } from "../../authentication/user";
import { MutateEventShareeParameters } from "../../define/parameters";

export default async function InsertEventSharee(
    data: MutateEventShareeParameters, 
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.InsertEventSharee: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('EventID', sql.Int, data.EventID)
            .input('EventShareeID', sql.UniqueIdentifier, data.EventShareeID)
            .execute('Employee.InsertEventSharee');
        
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}