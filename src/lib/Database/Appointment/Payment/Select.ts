"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface GetPaymentData {
    EmployeeID: number;
    AppointmentID: number;
}

type Payment = {
    AppointmentID: number;
    PaymentID: number;
    Payment: string;
    PaymentDate: string;
    Name: string;
    Type: string;
    CCN: string;
    EXP: string;
}

export default async function GetPayment(data: GetPaymentData)
: Promise<Array<Payment> | null> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Appointment.GetPayment", data));
        return res.recordset;   
    }
    catch (err) {
        console.error(err);
        return null;
    }
}