'use server';
import { processForm } from './Process';
import { DataType } from './Data';
import { AuthenticateAppointmentSession, AuthenticateLookup, GetAppointmentSummary } from '@/db/export';
import { DB_AppointmentSummary } from '@/database/interfaces';

export type DataKeys = 'Email' | 'AppointmentID';

export interface DataType {
    Email: string;
    AppointmentID: string;
}

export const InitialData = async (): Promise<DataType> => {
    return {
        Email: "",
        AppointmentID: ""
    }
}

import { DataType } from "./Data";

export interface ProcessedFormStructure {
    Email: string;
    AppointmentID: string;
}

export const processForm = (form: DataType): ProcessedFormStructure => {
    return {
        Email: form.Email.trim(),
        AppointmentID: form.AppointmentID.trim()
    }
}

export const submitForm = async (
    form: DataType
): Promise<DB_AppointmentSummary|null> => {
    const processedForm = processForm(form);

    const SessionID = await AuthenticateLookup(processedForm);
    if (!SessionID)
        return null;

    const AppointmentID = await AuthenticateAppointmentSession({SessionID});
    if (!AppointmentID)
        return null;

    return await GetAppointmentSummary({SessionID, AppointmentID});
}