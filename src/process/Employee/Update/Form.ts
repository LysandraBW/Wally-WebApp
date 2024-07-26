'use server';
import { DB_Appointment, DB_AppointmentService, DB_Diagnosis, DB_EmployeeNote, DB_Note, DB_Part, DB_Payment, DB_Repair } from "@/lib/Database/Types";

export type Parts = 'General' | 'Vehicle' | 'Services' | 'Cost' | 'Notes';

export interface UpdateNote extends DB_Note {
    Type: 'Attachment' | 'File';
    Files: Array<File>;
    Sharees: Array<string>
}

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
        Services: {[serviceID: number]: DB_AppointmentService};
        Diagnoses: {[diagnosisID: number]: DB_Diagnosis};
        Repairs: {[repairID: number]: DB_Repair};
        Parts: {[partID: number]: DB_Part};
    };
    Cost: {
        Cost: string;
        Payments: {[paymentID: number]: DB_Payment};
    };
    Notes: {
        Notes: {[noteID: number]: UpdateNote}
    }
}

export interface ControllerStructure {
    ref: Form;
    cur: Form;
}

export const Controller = async (app: DB_Appointment) => {
    const form = await appToForm(app);
    return {
        ref: form, 
        cur: form
    }
}

export interface HandlerStructure {
    appID: string,
    searchAppID: string,
    loading: boolean,
    loaded: boolean
}

export const Handler: HandlerStructure = {
    appID: '',
    searchAppID: '',
    loading: false,
    loaded: false
}

export async function appToForm(app: DB_Appointment): Promise<Form> {
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
    ref.Notes = app.Notes.map((note: DB_EmployeeNote) => {
        return {...note, Type: 'Attachment', Files: []}
    });

    // Services
    const services: {[serviceID: number]: DB_AppointmentService} = {};
    for (const service of app.Services) {
        services[service.AppointmentServiceID] = service;
    }
    
    const diagnoses: {[diagnosisID: number]: DB_Diagnosis} = {};
    for (const diagnosis of app.Diagnoses) {
        diagnoses[diagnosis.DiagnosisID] = diagnosis;
    }

    const repairs: {[repairID: number]: DB_Repair} = {};
    for (const repair of app.Repairs) {
        repairs[repair.RepairID] = repair;
    }

    const parts: {[partID: number]: DB_Part} = {};
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
    const payments: {[paymentID: number]: DB_Payment} = {};
    for (const payment of app.Payments) {
        payments[payment.PaymentID] = payment;
    }
    ref.Cost = {
        Cost:       app.Cost,
        Payments:   payments
    }

    return <Form> ref;
}