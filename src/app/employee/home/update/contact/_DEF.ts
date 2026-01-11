import { z } from "zod";
import { toSQLDateTime, toString } from "@/utils/convert";
import { Appointment as DB_Appointment, isName, isEmail, isPhone, isDate, isInteger, isEmptyString } from "waltronics-types";

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
        StartDate: appointment.StartDate ? appointment.StartDate.slice(0, -1)  : "",
        EndDate: appointment.EndDate ? appointment.EndDate.slice(0, -1)  : "",
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
    FName: isName,
    LName: isName,
    Email: isEmail,
    Phone: isPhone,
    StartDate: z.union([
        isEmptyString(),
        isDate
    ]),
    EndDate: z.union([
        isEmptyString(),
        isDate
    ]),
    StatusID: isInteger
});