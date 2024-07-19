"use server";
import sql from "mssql";
import { config, ConfigType } from "../Connection";
import Query from "../Query";

interface AuthenticateLoginData {
    Username: string;
    Password: string;
}

export default async function AuthenticateLogin(configType: ConfigType, data: AuthenticateLoginData)
: Promise<number> {
    try {
        await sql.connect(await config(configType, data));
        const res = await sql.query(Query("EXEC Employee.AuthenticateLogin", data));
        return res.recordset[0].EmployeeID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}
