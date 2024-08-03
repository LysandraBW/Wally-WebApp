import { FormStructure } from "./Form";

export interface ProcessedFormStructure {
    Email: string;
    AppointmentID: string;
}

export const processForm = (form: FormStructure): ProcessedFormStructure => {
    return {
        Email: form.email.trim(),
        AppointmentID: form.appointmentID.trim()
    }
}