'use server';
import { DB_Appointment, DB_AppointmentService, DB_Diagnosis, DB_Repair, DB_Part, DB_Payment } from "@/lib/Database/Types";
import { FormStructure, UpdateNote } from "./Form";
import { GetNoteSharees } from "@/lib/Database/Export";
import { getSessionID } from "@/lib/Cookies/Cookies";

export async function appToForm(app: DB_Appointment): Promise<FormStructure> {
    let ref: { [k: string]: any; } = {};
    ref.General = {
        AppointmentID: app.AppointmentID,
        FName: app.FName,
        LName: app.LName,
        Email: app.Email,
        Phone: app.Phone,
        StartDate: app.StartDate,
        EndDate: app.EndDate,
        StatusID: app.StatusID
    };
    ref.Vehicle = {
        AppointmentID: app.AppointmentID,
        Make: app.Make,
        Model: app.Model,
        ModelYear: app.ModelYear,
        VIN: app.VIN,
        Mileage: app.Mileage,
        LicensePlate: app.LicensePlate
    };

    // Services
    const services: { [serviceID: number]: DB_AppointmentService; } = {};
    for (const service of app.Services) {
        services[service.AppointmentServiceID] = service;
    }

    // Diagnoses
    const diagnoses: { [diagnosisID: number]: DB_Diagnosis; } = {};
    for (const diagnosis of app.Diagnoses) {
        diagnoses[diagnosis.DiagnosisID] = diagnosis;
    }

    // Repairs
    const repairs: { [repairID: number]: DB_Repair; } = {};
    for (const repair of app.Repairs) {
        repairs[repair.RepairID] = repair;
    }

    // Parts
    const parts: { [partID: number]: DB_Part; } = {};
    for (const part of app.Parts) {
        parts[part.PartID] = part;
    }

    ref.Services = {
        AppointmentID: app.AppointmentID,
        Services: services,
        Diagnoses: diagnoses,
        Repairs: repairs,
        Parts: parts,
    };

    // Notes
    const notes: {[ noteID: number]: UpdateNote} = {};
    for (const note of app.Notes) {
        const sharees = (await GetNoteSharees({
            SessionID: await getSessionID(),
            NoteID: note.NoteID
        })).map(sharee => sharee.ShareeID);
        notes[note.NoteID] =  { ...note, Type: 'Attachment', Files: [], Sharees: sharees};
    }
    ref.Notes = {
        AppointmentID: app.AppointmentID,
        Notes: notes
    };

    // Payments
    const payments: { [paymentID: number]: DB_Payment; } = {};
    for (const payment of app.Payments) {
        payments[payment.PaymentID] = payment;
    }
    ref.Cost = {
        AppointmentID: app.AppointmentID,
        Cost: app.Cost,
        Payments: payments
    };

    return <FormStructure>ref;
}

export const Controller = async (app: DB_Appointment) => {
    const form = await appToForm(app);
    return {
        ref: form,
        cur: form
    };
}