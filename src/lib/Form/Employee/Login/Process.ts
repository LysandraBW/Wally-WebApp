import { FormStructure } from "./Form";

export interface ProcessedFormStructure {
    Username: string;
    Password: string;
}

export const processForm = (form: FormStructure): ProcessedFormStructure => {
    return {
        Username: form.username.trim(),
        Password: form.password.trim()
    }
}