import { DB_Appointment } from "@/database/Types";

export type DataKeys = 'PartName' | 'PartNumber' | 'Quantity' | 'UnitCost';

export type UpdatePart = {
    PartID:     number;
    PartName:   string;
    PartNumber: string;
    Quantity:   string;
    UnitCost:   string;
}

export interface PartsStructure {
    [partID: string]: UpdatePart;
}

export interface PartsFormStructure {
    AppointmentID: string;
    Parts: PartsStructure;
}

export const InitialPartsForm = async (appointment: DB_Appointment): Promise<PartsFormStructure> => {
    const parts: PartsStructure = {};
    for (const part of appointment.Parts) {
        parts[part.PartID] = {
            ...part, 
            Quantity: part.Quantity.toString(), 
            UnitCost: part.UnitCost.toString()
        };
    }
    return {
        AppointmentID: appointment.AppointmentID,
        Parts: parts
    };
}