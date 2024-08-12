import { DataType } from "./Data";

export interface ProcessedFormStructure {
    Email: string;
    AppointmentID: string;
}

export const processForm = (form: DataType): ProcessedFormStructure => {
    return {
        Email: form.email.trim(),
        AppointmentID: form.appointmentID.trim()
    }
}