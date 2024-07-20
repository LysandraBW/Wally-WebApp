"use server";
import sql from "mssql";
import { User, fetchPool } from "../../Pool";

interface DeleteEventData {
    EventOwnerID: number;
    EventID: number;
}

export default async function DeleteEvent(data: DeleteEventData, user: User = User.Employee)
: Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        await pool.request()
            .input('EventOwnerID', sql.Int, data.EventOwnerID)
            .input('EventID', sql.Int, data.EventID)
            .execute('Employee.DeleteEvent');
            
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}