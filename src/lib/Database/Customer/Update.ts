"use server";
import sql from "mssql";
import { config, ConfigType } from "../Connection";
import Query from "../Query";

interface UpdateCustomerData {
    EmployeeID: number;
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
}

export default async function UpdateCustomer(data: UpdateCustomerData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Customer.UpdateCustomer", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}