'use server';
import sql from 'mssql';
import { fetchPool } from '../../Pool';
import { User } from '../../User';

interface GetEventShareesData {
    SessionID: string;
    EventID: number;
}

type EventSharee = {
    ShareeFName: string;
    ShareeLName: string;
    ShareeID: number;
}

export default async function GetEventSharees(data: GetEventShareesData, user: User = User.Employee): 
Promise<Array<EventSharee> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.GetEventSharees: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.VarBinary, data.SessionID)
            .input('EventID', sql.Int, data.EventID)
            .execute('Employee.GetEventSharees');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}