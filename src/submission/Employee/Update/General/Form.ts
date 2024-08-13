import { DB_Appointment } from "@/database/Types";
import { toWebDateTime } from "@/lib/Convert/Convert";

export type DataKeys = 'FName' | 'LName' | 'Email' | 'Phone' | 'StartDate' | 'EndDate' | 'StatusID';

export interface GeneralFormStructure {
    AppointmentID:  string;
    FName:          string;
    LName:          string;
    Email:          string;
    Phone:          string;
    StartDate:      string;
    EndDate:        string;
    StatusID:       number;
}

export const InitialGeneralForm = async (appointment: DB_Appointment): Promise<GeneralFormStructure> => {
    return {
        AppointmentID:  appointment.AppointmentID,
        FName:          appointment.FName,
        LName:          appointment.LName,
        Email:          appointment.Email,
        Phone:          appointment.Phone,
        StartDate:      toWebDateTime(appointment.StartDate),
        EndDate:        toWebDateTime(appointment.EndDate),
        StatusID:       appointment.StatusID
    };
}