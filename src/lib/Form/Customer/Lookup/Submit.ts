"use server";
import { processForm } from "./Process";
import { FormStructure } from "./Form";
import { AuthenticateAppointmentSession, AuthenticateLookup, GetAppointmentSummary } from "@/lib/Database/Export";
import { AppointmentSummary } from "@/lib/Database/Appointment/Appointment";

export const submitForm = async (form: FormStructure): Promise<AppointmentSummary|null> => {
    const processedForm = processForm(form);

    const sessionID = await AuthenticateLookup(processedForm);
    if (!sessionID)
        return null;

    const appointmentID = await AuthenticateAppointmentSession({
        SessionID: sessionID
    });
    if (!appointmentID)
        return null;

    const info = await GetAppointmentSummary({
        SessionID: sessionID,
        AppointmentID: appointmentID
    });

    if (!info)
        return null;

    return info;
}