import { FormStructure } from "./Form";

export interface ProcessedFormStructure {
    LastDigits: string;
    Email: string;
}

export const processForm = (form: FormStructure): ProcessedFormStructure => {
    return {
        LastDigits: form.lastDigits,
        Email: form.email
    }
}