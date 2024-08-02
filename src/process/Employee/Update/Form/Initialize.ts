'use server';
import { 
    DB_Appointment, 
    DB_AppointmentService, 
    DB_Diagnosis, 
    DB_Repair, 
    DB_Part, 
    DB_Payment 
} from "@/database/Types";
import { UpdateFormStructure, UpdateStructure } from "./UpdateForm";
import { UpdateNote } from "./Form/Note/Note";
import { GetNoteSharees } from "@/database/Export";
import { getSessionID } from "@/lib/Storage/Cookies";
import { toWebDateTime } from "@/lib/Convert/Convert";

export async function initializeUpdateForm(employeeID: string, apt: DB_Appointment): Promise<UpdateStructure> {
    let reference: {[k: string]: any} = {};

    // General
    reference.General = {
        AppointmentID:  apt.AppointmentID,
        FName:          apt.FName,
        LName:          apt.LName,
        Email:          apt.Email,
        Phone:          apt.Phone,
        StartDate:      toWebDateTime(apt.StartDate),
        EndDate:        toWebDateTime(apt.EndDate),
        StatusID:       apt.StatusID
    };

    // Vehicle
    reference.Vehicle = {
        AppointmentID:  apt.AppointmentID,
        Make:           apt.Make,
        Model:          apt.Model,
        ModelYear:      apt.ModelYear,
        VIN:            apt.VIN,
        Mileage:        apt.Mileage,
        LicensePlate:   apt.LicensePlate
    };

    // Services
    const services: {[serviceID: number]: DB_AppointmentService} = {};
    for (const service of apt.Services)
        services[service.AppointmentServiceID] = service;

    // Diagnoses
    const diagnoses: {[diagnosisID: number]: DB_Diagnosis} = {};
    for (const diagnosis of apt.Diagnoses)
        diagnoses[diagnosis.DiagnosisID] = diagnosis;

    // Repairs
    const repairs: {[repairID: number]: DB_Repair} = {};
    for (const repair of apt.Repairs)
        repairs[repair.RepairID] = repair;

    // Parts
    const parts: {[partID: number]: DB_Part} = {};
    for (const part of apt.Parts)
        parts[part.PartID] = part;

    // All Services
    reference.Service = {
        AppointmentID:  apt.AppointmentID,
        Services:       services,
        Diagnoses:      diagnoses,
        Repairs:        repairs,
        Parts:          parts,
    };

    // Payments
    const payments: {[paymentID: number]: DB_Payment} = {};
    for (const payment of apt.Payments)
        payments[payment.PaymentID] = payment;

    // Payments
    reference.Payment = {
        AppointmentID:  apt.AppointmentID,
        Cost:           apt.Cost,
        Payments:       payments
    };

    // Formatting Notes
    const notes: {[ noteID: number]: UpdateNote} = {};
    for (const note of apt.Notes) {
        // Appointment IDs of Sharees
        let sharees = (await GetNoteSharees({
            SessionID: await getSessionID(),
            NoteID: note.NoteID
        })).map(sharee => sharee.ShareeID);

        notes[note.NoteID] =  { 
            ...note, 
            Type: 'Attachment', 
            Files: null, 
            Sharees: sharees
        };
    }

    // Notes
    reference.Note = {
        AppointmentID: apt.AppointmentID,
        EmployeeID: employeeID,
        Notes: notes
    };

    return <UpdateStructure> reference;
}

export const UpdateForm = async (employeeID: string, appointment: DB_Appointment): Promise<UpdateFormStructure> => {
    const form: UpdateStructure = await initializeUpdateForm(employeeID, appointment);
    return {
        current: form,
        reference: form
    };
}