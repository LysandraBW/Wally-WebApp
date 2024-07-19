"use server";
import sql from "mssql";
import { config, ConfigType } from "../../Connection";
import Query from "../../Query";

interface DeletePaymentData {
    EmployeeID: number;
    AppointmentID: number;
    PaymentID: number;
}

export default async function DeletePayment(data: DeletePaymentData)
: Promise<boolean> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        await sql.query(Query("EXEC Appointment.DeletePayment", data));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}