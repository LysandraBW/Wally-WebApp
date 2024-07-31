import { toDatabaseDateTime } from "@/lib/Convert/Convert";
import { updatedValue } from "../../Helper";
import { GeneralFormStructure } from "./General";

export interface ProcessedGeneralFormStructure {
    AppointmentID: string;
    FName:      string | null;
    LName:      string | null;
    Email:      string | null;
    Phone:      string | null;
    StartDate:  string | null;
    EndDate:    string | null;
    StatusID:   number | null;
}

export async function processGeneralForm(reference: GeneralFormStructure, current: GeneralFormStructure): Promise<ProcessedGeneralFormStructure> {
    return {
        AppointmentID: current.AppointmentID,
        FName:      updatedValue(reference.FName, current.FName),
        LName:      updatedValue(reference.LName, current.LName),
        Email:      updatedValue(reference.Email, current.Email),
        Phone:      updatedValue(reference.Phone, current.Phone),
        StartDate:  updatedValue(toDatabaseDateTime(reference.StartDate), toDatabaseDateTime(current.StartDate)),
        EndDate:    updatedValue(toDatabaseDateTime(reference.EndDate), toDatabaseDateTime(current.EndDate)),
        StatusID:   updatedValue(reference.StatusID, current.StatusID)
    }
}