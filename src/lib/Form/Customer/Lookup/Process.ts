import { FormStructure } from "./Form";

export interface ProcessedFormStructure {
    AppointmentID: string;
    Email: string;
}

export const processForm = (form: FormStructure): ProcessedFormStructure => {
    return {
        AppointmentID: form.appointmentID,
        Email: form.email
    }
}