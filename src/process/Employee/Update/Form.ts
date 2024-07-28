import { DB_AppointmentService, DB_Diagnosis, DB_Note, DB_Part, DB_Payment, DB_Repair } from "@/lib/Database/Types";

export type Parts = 'General' | 'Vehicle' | 'Services' | 'Cost' | 'Notes';

export interface GeneralFormStructure {
    AppointmentID: string;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
    StartDate: string;
    EndDate: string;
    StatusID: number;
}

export interface VehicleFormStructure {
    AppointmentID: string;
    Make: string;
    Model: string;
    ModelYear: number;
    VIN: string;
    Mileage: number;
    LicensePlate: string;
}

export interface ServicesFormStructure {
    AppointmentID: string;
    Services: {[serviceID: string]: DB_AppointmentService};
    Diagnoses: {[diagnosisID: string]: DB_Diagnosis};
    Repairs: {[repairID: string]: DB_Repair};
    Parts: {[partID: string]: DB_Part};
}

export interface CostFormStructure {
    AppointmentID: string;
    Cost: number;
    Payments: {[paymentID: string]: DB_Payment};
}

export interface UpdateNote extends DB_Note {
    Type: 'Attachment' | 'File';
    Files: FormData | null;
    Sharees: Array<string>
}

export interface NotesFormStructure {
    AppointmentID: string;
    Notes: {[noteID: string]: UpdateNote};
}

export interface FormStructure {
    General:    GeneralFormStructure;
    Vehicle:    VehicleFormStructure;
    Services:   ServicesFormStructure;
    Cost:       CostFormStructure;
    Notes:      NotesFormStructure;
}

export interface ControllerStructure {
    ref: FormStructure;
    cur: FormStructure;
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