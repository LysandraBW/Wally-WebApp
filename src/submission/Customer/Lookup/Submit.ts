'use server';
import { processForm } from './Process';
import { DataType } from './Data';
import { AuthenticateAppointmentSession, AuthenticateLookup, GetAppointmentSummary } from '@/database/Export';
import { DB_AppointmentSummary } from '@/database/Types';

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