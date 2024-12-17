'use server';
import sql from 'mssql';
import { User } from '../../authentication/user';
import { fetchPool } from '../../authentication/auth';
import { DB_EventSharee } from '../../define/interfaces';
import { GetEventShareesParameters } from "../../define/parameters";

export default async function GetEventSharees(
    data: GetEventShareesParameters, 
    user: User = User.Employee
): Promise<Array<DB_EventSharee>> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.GetEventSharees: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('EventID', sql.Int, data.EventID)
            .execute('Employee.GetEventSharees');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}