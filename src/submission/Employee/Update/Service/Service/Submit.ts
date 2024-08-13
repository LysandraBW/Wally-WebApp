import { getSessionID } from "@/lib/Storage/Storage";
import { ServicesFormStructure } from "./Form";
import { ProcessedServicesFormStructure, processServicesForm } from "./Process";
import { DeleteService, InsertService, UpdateService } from "@/database/Export";

export async function submitServicesForm(reference: ServicesFormStructure, updated: ServicesFormStructure): Promise<boolean> {
    const SessionID = await getSessionID();
    const AppointmentID = reference.AppointmentID;

    const processedForm: ProcessedServicesFormStructure = await processServicesForm(reference, updated);

    
    for (const updateService of processedForm.Update) {
        const output = await UpdateService({
            SessionID,
            AppointmentID,
            ...updateService
        });
        if (!output)
            throw 'Error in Submit Service Form';
    }

    for (const insertService of processedForm.Insert) {
        const output = await InsertService({
            SessionID,
            AppointmentID,
            ...insertService
        });
        if (!output)
            throw 'Error in Submit Service Form';
    }    

    for (const deleteService of processedForm.Delete) {
        const output = await DeleteService({
            SessionID,
            AppointmentID,
            ...deleteService
        });
        if (!output)
            throw 'Error in Submit Service Form';
    }

    return true;
}