"use server";
import sql from "mssql";
import { config, ConfigType } from "../Connection";
import Query from "../Query";

interface GetData {
    AppointmentID: number;
    EmployeeID: number;
}

export type Appointment  = {
    AppointmentID:  number;
    CustomerID:     number;
    FName:          string;
    LName:          string;
    Email:          string;
    Phone:          string;
    CreationDate:   string;
    UpdationDate:   string;
    StartDate:      string;
    EndDate:        string;
    Cost:           string;
    StatusID:       number;
    Status:         string;
    Make:           string;
    Model:          string;
    ModelYear:      number;
    VIN:            string;
    Mileage:        number;
    LicensePlate:   string;
}

type FullAppointment = Appointment & {
    EmployeeID:     number;
    Seen:           number;
    Flag:           number;
    Star:           number;
}

export async function Get(data: GetData)
: Promise<FullAppointment | null> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Appointment.Get", data));
        return res.recordset[0];
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

interface GetSummaryData {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}

export async function GetSummary(configType: ConfigType, data: GetSummaryData)
: Promise<Appointment | null> {
    try {
        // Incorrectly using a "global pool". Need to redo all the files
        // const pool = await sql.connect(await config(configType, data));
        await sql.connect(await config(configType, data));
        const res = await sql.query(Query("EXEC Appointment.GetSummary", data));
        // await pool.close();
        return res.recordset[0];
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

interface GetAllData {
    EmployeeID: number;
    StartIndex: number;
    PageSize: number;
    Label: string;
    StatusID: number;
    OrderByFName: number;
    OrderDirFName: string;
    OrderByLName: number;
    OrderDirLName: string;
    OrderByMake: number;
    OrderDirMake: string;
    OrderByModel: number;
    OrderDirModel: string;
    OrderByModelYear: number;
    OrderDirModelYear: string;
    OrderByCreationDate: number;
    OrderDirCreationDate: string;
    OrderByStartDate: number;
    OrderDirStartDate: string;
    OrderByEndDate: number;
    OrderDirEndDate: string;
    OrderByCost: number;
    OrderDirCost: string;
    Search: string;
}

export async function GetAll(data: GetAllData)
: Promise<Array<FullAppointment> | null> {
    try {
        await sql.connect(await config(ConfigType.Employee, data));
        const res = await sql.query(Query("EXEC Appointment.GetAll", data));
        return res.recordset
    }
    catch (err) {
        console.error(err);
        return null;
    }
}