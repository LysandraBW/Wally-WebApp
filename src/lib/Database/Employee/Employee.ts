'use server';
import sql from 'mssql';
import { fetchPool } from '../Pool';
import { User } from '../User';

interface GetData {
    SessionID: string;
}

export type Employee = {
    SessionID: string;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
} | null;

export async function Get(data: GetData, user: User = User.Employee): Promise<Employee> {
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

type GetAllReturnType = {
    SessionID: string;
    FName: string;
    LName: string;
}

export async function GetAll(data: GetData, user = User.Employee): Promise<Array<GetAllReturnType> | null> {
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
        return null;
    }
}