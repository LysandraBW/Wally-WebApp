'use server';
import sql from 'mssql';
import { User } from '../authentication/user';
import { fetchPool } from '../authentication/auth';
import { AuthenticateLoginParameters } from "../define/parameters";
import { SessionParameter } from "../define/parameters";

export async function AuthenticateLogin(
    data: AuthenticateLoginParameters, 
    user: User = User.Standard
): Promise<string> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.AuthenticateLogin: Undefined Pool';

        const output = await pool.request()
            .input('Username', sql.VarChar(50), data.Username)
            .input('Password', sql.VarChar(50), data.Password)
            .output('SessionID', sql.Char(36))
            .execute('Employee.AuthenticateLogin');

        return output.output.SessionID;
    }
    catch (err) {
        console.error(err);
        return '';
    }
}

export async function AuthenticateSession(
    data: SessionParameter,
    user: User = User.Standard
): Promise<string> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.AuthenticateSession: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .output('EmployeeID', sql.UniqueIdentifier)
            .execute('Employee.AuthenticateSession');

        return output.output.EmployeeID;
    }
    catch (err) {
        console.error(err);
        return '';
    }
}

export async function LogOut(
    data: SessionParameter,
    user: User = User.Employee
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Employee.LogOut: Undefined Pool';

        await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .execute('Employee.LogOut');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}