import { FormStructure } from "./Form";

export interface ProcessedFormStructure {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}

export const processForm = (form: FormStructure): ProcessedFormStructure => {
    return {
        AppointmentID: form.appointmentID,
        FName: form.fName.trim(),
        LName: form.lName.trim(),
        Email: form.email.trim(),
    }
}