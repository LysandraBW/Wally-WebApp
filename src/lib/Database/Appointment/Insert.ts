"use server";
import sql from "mssql";
import { config, ConfigType } from "../Connection";
import Query from "../Query";

interface InsertAppointmentData {
    EmployeeID: number | null;
    FName:      string;
    LName:      string;
    Email:      string;
    Phone:      string;
    Make:       string;
    Model:      string;
    ModelYear:  number;
    VIN:        string | null;
}

export default async function InsertAppointment(configType: ConfigType, data: InsertAppointmentData)
: Promise<number> {
    try {
        await sql.connect(await config(configType, data));
        const res = await sql.query(Query("EXEC Appointment.InsertAppointment", data));
        return res.recordset[0].AppointmentID;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}