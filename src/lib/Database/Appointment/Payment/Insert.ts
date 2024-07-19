"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface InsertPaymentData {
    EmployeeID: number;
    AppointmentID: number;
    Payment: string;
}

export async function InsertPayment(configType: ConfigType, data: InsertPaymentData)
: Promise<number> {
    try {
        await sql.connect(await config(configType, data));
        const res = await sql.query(Query("EXEC Appointment.InsertPayment", data));
        return res.recordset[0].PaymentID;
    }   
    catch (err) {
        console.error(err);
        return 0;
    }
}

interface InsertCreditCardData {
    EmployeeID: number;
    AppointmentID: number;
    PaymentID: number;
    Name: string;
    Type: string;
    CNN: string;
    EXP: string;
}

export async function InsertCreditCard(configType: ConfigType, data: InsertCreditCardData)
: Promise<boolean> {
    try {
        await sql.connect(await config(configType, data));
        await sql.query(Query("EXEC Appointment.InsertCreditCard", data));
        return true;   
    }
    catch (err) {
        console.error(err);
        return false;
    }
}