"use server";
import sql from "mssql";
import { fetchPool } from "../../Pool";
import { User } from "../../User";

interface DeleteEventData {
    SessionID: string;
    EventID: number;
}

export default async function DeleteEvent(data: DeleteEventData, user: User = User.Employee): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.DeleteEvent: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('EventID', sql.Int, data.EventID)
            .execute('Employee.DeleteEvent');
            
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}