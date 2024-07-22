"use server";
import sql from "mssql";
import { fetchPool } from "../Pool";
import { User } from "../User";

interface AuthenticateTokenData {
    EmployeeID: number;
    Username: string;
    Password: string;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
}

export default async function AuthenticateToken(
    data: AuthenticateTokenData, 
    user: User = User.Default
): Promise<number> {
    try {
        console.log(5);
        console.log(data);
        const pool = await fetchPool(user, data);
        if (!pool)
            throw "AuthenticateToken: Undefined Pool";

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('FName', sql.VarChar, data.FName)
            .input('LName', sql.VarChar, data.LName)
            .input('Email', sql.VarChar, data.Email)
            .input('Phone', sql.VarChar, data.Phone)
            .input('Username', sql.VarChar, data.Username)
            .input('Password', sql.VarChar, data.Password)
            .execute("Employee.AuthenticateToken");

        return output.recordset[0].EmployeeID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}
