import { z } from "zod";
import { toInputDate, toString } from "@/utils/convert";
import { Appointment as DB_Appointment } from "waltronics-types";

export interface Contact {
    FName: string
    LName: string;
    Email: string;
    Phone: string;
    EndDate: string;
    StartDate: string;
    StatusID: [string];
}

export function makeContact(appointment: DB_Appointment): Contact {
    return {
        FName: appointment.FName,
        LName: appointment.LName,
        Email: appointment.Email,
        Phone: appointment.Phone,
        StartDate: toInputDate(appointment.StartDate),
        EndDate: toInputDate(appointment.EndDate),
        StatusID: [toString(appointment.StatusID)]
    };
}

export interface ContactUpdates {
    FName: string | null;
    LName: string | null;
    Email: string | null;
    Phone: string | null;
    StartDate: string | null;
    EndDate: string | null;
    StatusID: string | null;
}

export const contactTest = z.object({
    FName: z.string(),
    LName: z.string(),
    Email: z.string(),
    Phone: z.string(),
    StartDate: z.string(),
    EndDate: z.string(),
    StatusID: z.any()
});