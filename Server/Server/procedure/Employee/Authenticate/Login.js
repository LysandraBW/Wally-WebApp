import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../constant.js";
import { getStandardPool } from "../../../connectionPool.js";
import { isString } from "../../../validation/effect.js";

export async function execLogin(data) {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("Username", sql.VarChar(50), data.username)
            .input("Password", sql.VarChar(50), data.password)
            .output("SessionID", sql.Char(36))
            .execute("Employee.LoginEmployee")
        
        return output.output.SessionID;
    }
    catch (err) {
        console.error(err);
        return "";
    }
}

export const testLogin = z.object({
    username: isString.max(50),
    password: isString.max(50)
});

export const employeeLogin = {
    test: (input) => testLogin.safeParse(input),
    exec: (input) => execLogin(input)
}