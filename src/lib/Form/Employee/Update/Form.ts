'use server';
import { getSessionID } from "@/lib/Authorize/Authorize";
import { Appointment } from "@/lib/Database/Appointment/Appointment";
import { Attachment } from "@/lib/Database/Appointment/Note/Select";
import { NoteSharee } from "@/lib/Database/Appointment/SharedNote/Select";
import { GetNoteSharees } from "@/lib/Database/Export";

export interface Service {
    Class: string;
    Division: string;
    Service: string;
    ServiceID: number;
}

export interface Diagnosis {
    Code: string;
    Message: string;
}

export interface Repair {
    Repair: string;
}

export interface Part {
    PartName: string;
    PartNumber: string;
    Quantity: string;
    UnitCost: string;
}

export interface Payment {
    Payment: string;
    PaymentDate: string;
    Name: string;
    Type: string;
    CCN: string;
    EXP: string;
}

export interface Note {
    Head: string;
    Body: string;
    Attachments: Array<['Attachment', Attachment]|['File', File]>;
    ShowCustomer: number;
    Sharees: Array<NoteSharee>;
}

export type Parts = 'General' | 'Vehicle' | 'Services' | 'Cost' | 'Notes';

export interface Form {
    General: {
        FName: string;
        LName: string;
        Email: string;
        Phone: string;
        StartDate: Date;
        EndDate: Date;
        StatusID: number;
    };
    Vehicle: {
        Make: string;
        Model: string;
        ModelYear: number;
        VIN: string;
        Mileage: number;
        LicensePlate: string;
    };
    Services: {
        Services: {[serviceID: number]: Service};
        Diagnoses: {[diagnosisID: number]: Diagnosis};
        Repairs: {[repairID: number]: Repair};
        Parts: {[partID: number]: Part};
    };
    Cost: {
        Cost: string;
        Payments: {[paymentID: number]: Payment};
    };
    Notes: {
        Notes: {[noteID: number]: Note}
    }
}

export async function appToForm(app: Appointment): Promise<Form> {
    let ref: {[k: string]: any} = {};
    ref.General = {
        FName: app.FName,
        LName: app.LName,
        Email: app.Email,
        Phone: app.Phone,
        StartDate: app.StartDate,
        EndDate: app.EndDate,
        StatusID: app.StatusID
    }
    ref.Vehicle = {
        Make: app.Make,
        Model: app.Model,
        ModelYear: app.ModelYear,
        VIN: app.VIN,
        Mileage: app.Mileage,
        LicensePlate: app.LicensePlate
    }

    // Services
    const services: {[serviceID: number]: Service} = {};
    for (const service of app.Services) {
        services[service.AppointmentServiceID] = service;
    }
    
    const diagnoses: {[diagnosisID: number]: Diagnosis} = {};
    for (const diagnosis of app.Diagnoses) {
        diagnoses[diagnosis.DiagnosisID] = diagnosis;
    }

    const repairs: {[repairID: number]: Repair} = {};
    for (const repair of app.Repairs) {
        repairs[repair.RepairID] = repair;
    }

    const parts: {[partID: number]: Part} = {};
    for (const part of app.Parts) {
        parts[part.PartID] = part;
    }

    ref.Services = {
        Services:   services,
        Diagnoses:  diagnoses,
        Repairs:    repairs,
        Parts:      parts,
    };

    // Payments
    const payments: {[paymentID: number]: Payment} = {};
    for (const payment of app.Payments) {
        payments[payment.PaymentID] = payment;
    }
    ref.Cost = {
        Cost:       app.Cost,
        Payments:   payments
    };

    // Attachments
    const sortedAttachments: {[k: number]: Array<['Attachment', Attachment]>} = {};
    for (const attachment of app.Attachments) {
        if (!sortedAttachments[attachment.NoteID])
            sortedAttachments[attachment.NoteID] = [];
        sortedAttachments[attachment.NoteID].push(['Attachment', attachment]);
    }

    // Notes
    const notes: {[noteID: number]: Note} = {};
    for (const note of app.Notes) {
        notes[note.NoteID] = {
            ...note,
            Attachments: sortedAttachments[note.NoteID],
            Sharees: await GetNoteSharees({
                SessionID: await getSessionID(),
                NoteID: note.NoteID
            })
        };
    }
    ref.Notes = {
        Notes: notes
    };

    return <Form> ref;
}