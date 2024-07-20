"use server";
import sql from "mssql";
import { User, fetchPool } from "../Pool";
import { Service } from "./Service/Select";
import { Diagnosis } from "./Diagnosis/Select";
import { Fix } from "./Fix/Select";

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
    Services:       Array<Service>,
    Diagnosis:      Array<Diagnosis>,
    Fixes:          Array<Fix>;
}

type FullAppointment = Appointment & {
    EmployeeID:     number;
    Seen:           number;
    Flag:           number;
    Star:           number;
}

export async function Get(
    data: GetData, 
    user: User = User.Employee
): Promise<FullAppointment | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .execute('Appointment.Get');

        return {
            ...(<sql.IRecordSet<any>> output.recordsets)[0],
            Services: (<sql.IRecordSet<any>> output.recordsets)[1],
            Diagnosis: (<sql.IRecordSet<any>> output.recordsets)[2],
            Fixes: (<sql.IRecordSet<any>> output.recordsets)[3]
        }
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

export async function GetSummary(
    data: GetSummaryData, 
    user: User = User.Employee
): Promise<Appointment | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('AppointmentID', sql.Int, data.AppointmentID)
            .input('FName', sql.Int, data.FName)
            .input('LName', sql.Int, data.LName)
            .input('Email', sql.Int, data.Email)
            .execute('Appointment.GetSummary');

        return {
            ...(<sql.IRecordSet<any>> output.recordsets)[0],
            Services: (<sql.IRecordSet<any>> output.recordsets)[1],
            Diagnosis: (<sql.IRecordSet<any>> output.recordsets)[2],
            Fixes: (<sql.IRecordSet<any>> output.recordsets)[3]
        }
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

export async function GetAll(
    data: GetAllData, 
    user: User = User.Employee
): Promise<Array<FullAppointment> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Undefined Pool';

        const output = await pool.request()
            .input('EmployeeID', sql.Int, data.EmployeeID)
            .input('StartIndex', sql.Int, data.StartIndex)
            .input('PageSize', sql.Int, data.PageSize)
            .input('Label', sql.NVarChar, data.Label)
            .input('StatusID', sql.Int, data.StatusID)
            .input('OrderByFName', sql.Int, data.OrderByFName)
            .input('OrderDirFName', sql.NVarChar, data.OrderDirFName)
            .input('OrderByLName', sql.Int, data.OrderByLName)
            .input('OrderDirLName', sql.NVarChar, data.OrderDirLName)
            .input('OrderByMake', sql.Int, data.OrderByMake)
            .input('OrderDirMake', sql.NVarChar, data.OrderDirMake)
            .input('OrderByModel', sql.Int, data.OrderByModel)
            .input('OrderDirModel', sql.NVarChar, data.OrderDirModel)
            .input('OrderByModelYear', sql.Int, data.OrderByModelYear)
            .input('OrderDirModelYear', sql.NVarChar, data.OrderDirModelYear)
            .input('OrderByCreationDate', sql.Int, data.OrderByCreationDate)
            .input('OrderDirCreationDate', sql.NVarChar, data.OrderDirCreationDate)
            .input('OrderByStartDate', sql.Int, data.OrderByStartDate)
            .input('OrderDirStartDate', sql.NVarChar, data.OrderDirStartDate)
            .input('OrderByEndDate', sql.Int, data.OrderByEndDate)
            .input('OrderDirEndDate', sql.NVarChar, data.OrderDirEndDate)
            .input('OrderByCost', sql.Int, data.OrderByCost)
            .input('OrderDirCost', sql.NVarChar, data.OrderDirCost)
            .input('Search', sql.Int, data.Search)
            .execute('Appointment.GetAll');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}