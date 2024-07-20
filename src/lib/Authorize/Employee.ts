'use server';
import { authorizeToken } from "./Authorize";
import { AuthenticateToken } from "../Database/Export";
import { decrypt } from "../Hash/Hash";

export type EmployeeToken = {
    EmployeeID: number;
    // Quick and Dirty Fixes
    // Just to get this working
    Username: string;
    Password: string;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
}

export const authorizeEmployee = async (): Promise<EmployeeToken | null>  => {
    // Authenticating
    const callback = async (data: EmployeeToken) => {
        console.log(4);
        const employeeID = await AuthenticateToken({
            ...data,
            Username: await decrypt(data.Username),
            Password: await decrypt(data.Password)
        });
        return !!employeeID;
    }

    // Authorizing
    console.log(2);
    const employee = await authorizeToken(callback);
    console.log('HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEES')
    if (!employee)
        return null;
    return employee;
}