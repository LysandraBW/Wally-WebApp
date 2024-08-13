import { DB_Appointment, DB_Repair } from "@/database/Types";

export type DataKeys = 'Repair';

export interface RepairsStructure {
    [repairID: string]: DB_Repair;
}

export interface RepairsFormStructure {
    AppointmentID: string;
    Repairs: RepairsStructure;
}

export const InitialRepairsForm = (appointment: DB_Appointment): RepairsFormStructure => {
    const repairs: RepairsStructure = {};
    for (const repair of appointment.Repairs)
        repairs[repair.RepairID] = repair;

    return {
        AppointmentID: appointment.AppointmentID,
        Repairs: repairs
    }
}