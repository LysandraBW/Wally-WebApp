'use server';
import sql from 'mssql';
import { fetchPool } from '../authentication/auth';
import { User } from '../authentication/user';
import { DB_Employee, DB_GeneralEmployee } from '../define/interfaces';
import { SessionParameter } from "../define/parameters";

export async function Get(
    data: SessionParameter, 
    user: User = User.Employee
): Promise<DB_Employee|null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.Get: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .execute('Employee.Get');

        return output.recordset[0];
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export async function GetAll(
    data: SessionParameter,
    user = User.Employee
): Promise<Array<DB_GeneralEmployee>> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.GetAll: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .execute('Employee.GetAll');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}