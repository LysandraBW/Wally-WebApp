"use server";
import sql from "mssql";
import { fetchPool } from "../Pool";
import { User } from "../User";
import { Diagnosis } from "./Diagnosis/Select";
import { Service } from "./Service/Select";
import { Repair } from "./Repair/Select";
import { Payment } from "./Payment/Select";
import { Label } from "../Info/Info";
import { Part } from "./Part/Select";
import { Note } from "./Note/Select";

interface GetData {
    SessionID: string;
    AppointmentID: string;
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
    Diagnoses:      Array<Diagnosis>,
    Repairs:        Array<Repair>
    Parts:          Array<Part>
    Payments:       Array<Payment>
    Labels:         Array<Label>;
    Notes:          Array<Note>;
}

export async function Get(
    data: GetData, 
    user: User = User.Employee
): Promise<Appointment | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.Get: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.Get');

        const recordsets = <sql.IRecordSet<any>> output.recordsets;

        return {
            ...recordsets[0][0],
            Services:   recordsets[1],
            Diagnoses:  recordsets[2],
            Repairs:    recordsets[3],
            Parts:      recordsets[4],
            Payments:   recordsets[5],
            Labels:     recordsets[6],
            Notes:      recordsets[7]
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

interface GetSummaryData {
    SessionID: string;
    AppointmentID: string;
}

export type AppointmentSummary  = {
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
    Services:       Array<Service>;
    Diagnoses:      Array<Diagnosis>;
    Repairs:        Array<Repair>;
    Notes:          Array<Note>;
}

export async function GetSummary(
    data: GetSummaryData, 
    user: User = User.Customer
): Promise<AppointmentSummary | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetSummary: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.GetSummary');

        const recordsets = <sql.IRecordSet<any>> output.recordsets;
        return {
            ...recordsets[0][0],
            Services:   recordsets[1],
            Diagnoses:  recordsets[2],
            Repairs:    recordsets[3],
            Notes:      recordsets[4]
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

interface GetAllData {
    SessionID:  string;
    PageNumber?: number;
    PageSize?:   number;
    LookAhead?:  number;
    Search?:     string;
    Deleted?:    number;
    LabelID?:    number;
    StatusID?:   number;
    FName?:      number;
    LName?:      number;
    Make?:       number;
    Model?:      number;
    ModelYear?:  number;
    CreationDate?: number;
    StartDate?:  number;
    EndDate?:    number;
    Cost?:       number
}

export type QuickAppointment  = {
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
}

export async function GetAll(
    data: GetAllData, 
    user: User = User.Employee
): Promise<Array<QuickAppointment> | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.GetAll: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('PageNumber', sql.Int, data.PageNumber)
            .input('PageSize', sql.Int, data.PageSize)
            .input('LookAhead', sql.Int, data.LookAhead)
            .input('Search', sql.VarChar(320), data.Search)
            .input('Deleted', sql.Bit, data.Deleted)
            .input('LabelID', sql.Int, data.LabelID)
            .input('StatusID', sql.Int, data.StatusID)
            .input('FName', sql.Bit, data.FName)
            .input('LName', sql.Bit, data.LName)
            .input('Make', sql.Bit, data.Make)
            .input('Model', sql.Bit, data.Model)
            .input('ModelYear', sql.Bit, data.ModelYear)
            .input('CreationDate', sql.Bit, data.CreationDate)
            .input('StartDate', sql.Bit, data.StartDate)
            .input('EndDate', sql.Bit, data.EndDate)
            .input('Cost', sql.Bit, data.Cost)           
            .execute('Appointment.GetAll');

        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}