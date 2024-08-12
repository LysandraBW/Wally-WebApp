"use server";
import sql from "mssql";
import { User } from "../User";
import { fetchPool } from "../Pool";
import { DB_Appointment, DB_Appointments, DB_AppointmentSummary, DB_Attachment, DB_AllAppointmentLabels, DB_EmployeeNote, DB_AppointmentLabel, DB_AppointmentLabels } from "../Types";
import { GetAllParameters, SessionAppParameters } from "../Parameters";
import { sortAllAppointmentLabels, sortAppointmentLabels } from "./Label/Helper";
import { attachAttachments } from "./Note/Helper";

export async function Get(
    data: SessionAppParameters, 
    user: User = User.Employee
): Promise<DB_Appointment | null> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Appointment.Get: Undefined Pool';

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.SessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.AppointmentID)
            .execute('Appointment.Get');

        const recordsets = <sql.IRecordSet<any>> output.recordsets;

        // Attaching Attachments to Notes In-Place
        const notes: Array<DB_EmployeeNote> = recordsets[7];
        const attachments: Array<DB_Attachment> = recordsets[8];
        await attachAttachments(notes, attachments);

        // Sorting Labels
        const labels: Array<DB_AppointmentLabel> = recordsets[6];
        const sortedLabels: DB_AppointmentLabels = sortAppointmentLabels(labels);

        return {
            ...recordsets[0][0],
            Services:   recordsets[1],
            Diagnoses:  recordsets[2],
            Repairs:    recordsets[3],
            Parts:      recordsets[4],
            Payments:   recordsets[5],
            Labels:     sortedLabels,
            Notes:      notes
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export async function GetSummary(
    data: SessionAppParameters, 
    user: User = User.Customer
): Promise<DB_AppointmentSummary| null> {
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

export async function GetAll(
    data: GetAllParameters, 
    user: User = User.Employee
): Promise<DB_Appointments> {
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

        const recordsets = <sql.IRecordSet<any>> output.recordsets;

        // Sorting Labels
        const labels: Array<DB_AppointmentLabel> = recordsets[2];
        const sortedLabels: DB_AllAppointmentLabels = sortAllAppointmentLabels(labels);

        return {
            Appointments: recordsets[0],
            Count: recordsets[1][0].Count,
            Labels: sortedLabels
        };
    }
    catch (err) {
        console.error(err);
        return {
            Appointments: [], 
            Count: 0, 
            Labels: {}
        };
    }
}