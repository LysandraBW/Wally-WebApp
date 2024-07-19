"use server";
import { processForm } from "./ProcessedForm";
import { FormStructure } from "./Form";
import { Appointment } from "@/lib/Database/Appointment/Appointment";
import { Service } from "@/lib/Database/Appointment/Service/Select";
import { AuthenticateLookup, GetAppointmentSummary, GetDiagnosis, GetFixes, GetServices } from "@/lib/Database/Export";
import { Diagnosis } from "@/lib/Database/Appointment/Diagnosis/Select";
import { Fix } from "@/lib/Database/Appointment/Fix/Select";
import { config, ConfigType } from "@/lib/Database/Connection";
import "../../../Database/Connection.ts";

export type Summary = {
    Services: Array<Service>,
    Diagnosis: Array<Diagnosis>,
    Fixes: Array<Fix>
} & Appointment

export const submitForm = async (form: FormStructure)
: Promise<Summary|null> => {
    let processedForm = processForm(form);

    if (!AuthenticateLookup(ConfigType.Default, processedForm))
        return null;

    const Appointment: Appointment | null = await GetAppointmentSummary(
        ConfigType.Customer, 
        processedForm
    );
    if (!Appointment)
        return null;

    const Services: Array<Service> | null = await GetServices(
        ConfigType.Customer, 
        processedForm
    );
    if (!Services)
        return null;

    const Diagnosis: Array<Diagnosis> | null = await GetDiagnosis(
        ConfigType.Customer, 
        processedForm
    );
    if (!Diagnosis)
        return null;

    const Fixes: Array<Fix> | null = await GetFixes(
        ConfigType.Customer, 
        processedForm
    );
    if (!Fixes)
        return null;

    return {...Appointment, Services, Diagnosis, Fixes};
}