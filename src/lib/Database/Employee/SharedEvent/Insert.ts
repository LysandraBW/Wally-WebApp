"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface InsertEventShareesData {
    EventOwnerID: number;
    EventID: number;
    EventShareeID: number;
}

export default async function InsertEventSharee(data: InsertEventShareesData, user: User = User.Employee)
: Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('EventOwnerID', sql.Int, data.EventOwnerID)
            .input('EventID', sql.Int, data.EventID)
            .input('EventShareeID', sql.Int, data.EventShareeID)
            .execute('Employee.InsertEventShare');
        
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}