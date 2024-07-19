"use server";
import sql from "mssql";
import { config, ConfigType } from "../Connection";

interface GetData {
    EmployeeID: number;
}

type GetReturnType = {
    EmployeeID: number;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
}

export async function Get(data: GetData)
: Promise<GetReturnType | null> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(`EXEC Employee.Get @EmployeeID=${data.EmployeeID}`);
        return res.recordset[0];
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

export async function GetAll(data: GetData)
: Promise<Array<GetAllReturnType> | null> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(`EXEC Employee.GetAll @EmployeeID=${data.EmployeeID}`);
        return res.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}