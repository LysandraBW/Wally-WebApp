'use server';
import { processForm } from './Process';
import { FormStructure } from './Form';
import { AuthenticateAppointmentSession, AuthenticateLookup, GetAppointmentSummary } from '@/lib/Database/Export';
import { DB_AppointmentSummary } from '@/lib/Database/Types';

export const submitForm = async (form: FormStructure)
: Promise<DB_AppointmentSummary|null> => {
    const processedForm = processForm(form);

    const SessionID = await AuthenticateLookup(processedForm);
    if (!SessionID)
        return null;

    const AppointmentID = await AuthenticateAppointmentSession({SessionID});
    if (!AppointmentID)
        return null;

    return await GetAppointmentSummary({SessionID, AppointmentID});
}