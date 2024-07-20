"use server";
import { processForm } from "./Process";
import { FormStructure } from "./Form";
import { Appointment } from "@/lib/Database/Appointment/Appointment";
import { Service } from "@/lib/Database/Appointment/Service/Select";
import { AuthenticateLookup, GetAppointmentSummary } from "@/lib/Database/Export";
import { Diagnosis } from "@/lib/Database/Appointment/Diagnosis/Select";
import { Fix } from "@/lib/Database/Appointment/Fix/Select";

export type Summary = {
    Services: Array<Service>,
    Diagnosis: Array<Diagnosis>,
    Fixes: Array<Fix>
} & Appointment

export const submitForm = async (form: FormStructure)
: Promise<Summary|null> => {
    const processedForm = processForm(form);

    if (!AuthenticateLookup(processedForm))
        return null;

    const info = await GetAppointmentSummary(processedForm);

    if (!info)
        return null;

    return info;
}