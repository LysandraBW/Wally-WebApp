"use server";
import sql from "mssql";
import { fetchPool } from "../Pool";
import { User } from "../User";

interface GetData {
    EmployeeID: number;
}

export type Employee = {
    EmployeeID: number;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
}

export async function Get(data: GetData, user: User = User.Employee)
: Promise<Employee | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw "Undefined Pool";

        const output = await pool.request()
            .input("EmployeeID", sql.Int, data.EmployeeID)
            .execute("Employee.Get");

        return output.recordset[0];
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

type GetAllReturnType = {
    EmployeeID: number;
    FName: string;
    LName: string;
}

export async function GetAll(data: GetData, user = User.Employee)
: Promise<Array<GetAllReturnType> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw "Undefined Pool";

        const output = await pool.request()
            .input("EmployeeID", sql.Int, data.EmployeeID)
            .execute("Employee.GetAll");

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}