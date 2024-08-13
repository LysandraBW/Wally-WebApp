import { 
    DB_Appointment, 
    DB_AppointmentService, 
    DB_Diagnosis,
    DB_Repair 
} from "@/database/Types";

export type UpdatePart = {
    PartID:     number;
    PartName:   string;
    PartNumber: string;
    Quantity:   string;
    UnitCost:   string;
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

export interface ServiceFormStructure {
    AppointmentID:  string;
    Parts:          PartsStructure;
    Repairs:        RepairsStructure;
    Diagnoses:      DiagnosesStructure;
}

export const InitialServiceForm = async (appointment: DB_Appointment): Promise<ServiceFormStructure> => {
    // Diagnoses
    const diagnoses: DiagnosesStructure = {};
    for (const diagnosis of appointment.Diagnoses)
        diagnoses[diagnosis.DiagnosisID] = diagnosis;

    // Repairs
    const repairs: RepairsStructure = {};
    for (const repair of appointment.Repairs)
        repairs[repair.RepairID] = repair;

    // Parts
    const parts: PartsStructure = {};
    for (const part of appointment.Parts) {
        parts[part.PartID] = {
            ...part, 
            Quantity: part.Quantity.toString(), 
            UnitCost: part.UnitCost.toString()
        };
    }

    return {
        AppointmentID:  appointment.AppointmentID,
        Parts:          parts,
        Repairs:        repairs,
        Diagnoses:      diagnoses
    };
}