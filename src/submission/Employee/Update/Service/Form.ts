import { 
    DB_AppointmentService, 
    DB_Diagnosis,
    DB_Repair 
} from "@/database/Types";

export type UpdatePart = {
    PartID: number;
    PartName: string;
    PartNumber: string;
    Quantity: string;
    UnitCost: string;
};

export interface DiagnosesStructure {
    [diagnosisID: string]: DB_Diagnosis;
}

export interface RepairsStructure {
    [repairID: string]: DB_Repair;
}

export interface PartsStructure {
    [partID: string]: UpdatePart;
}

export interface ServicesStructure {
    [serviceID: string]: DB_AppointmentService;
}

export interface ServiceFormStructure {
    AppointmentID: string;
    Parts: PartsStructure;
    Repairs: RepairsStructure;
    Services: ServicesStructure;
    Diagnoses: DiagnosesStructure;
}