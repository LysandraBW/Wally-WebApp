"use server";
import sql from "mssql";
import { User, fetchPool } from "../Pool";

interface AuthenticateLoginData {
    Username: string;
    Password: string;
}

export default async function AuthenticateLogin(
    data: AuthenticateLoginData, 
    user: User = User.Default
): Promise<number> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw "AuthenticateLogin: Undefined Pool";

        const output = await pool.request()
            .input('Username', sql.VarChar(50), data.Username)
            .input('Password', sql.VarChar(50), data.Password)
            .execute("Employee.AuthenticateLogin");

        return output.recordset[0].EmployeeID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}