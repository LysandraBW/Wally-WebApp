import { getSessionID } from "@/lib/Storage/Storage";
import { RepairsFormStructure } from "./Form";
import { processRepairsForm } from "./Process";
import { DeleteRepair, InsertRepair, UpdateRepair } from "@/database/Export";

export async function submitRepairsForm(reference: RepairsFormStructure, current: RepairsFormStructure): Promise<boolean> {
    const SessionID = await getSessionID();
    const AppointmentID = reference.AppointmentID;

    const processedForm = await processRepairsForm(reference, current);

    for (const updateRepairs of processedForm.Update) {
        const output = await UpdateRepair({
            SessionID,
            AppointmentID,
            ...updateRepairs
        });
        if (!output)
            throw 'Error in Submit Service Form';
    }

    for (const insertRepairs of processedForm.Insert) {
        const output = await InsertRepair({
            SessionID,
            AppointmentID,
            ...insertRepairs
        });
        if (!output)
            throw 'Error in Submit Service Form';
    }

    for (const deleteRepairs of processedForm.Delete) {
        const output = await DeleteRepair({
            SessionID,
            AppointmentID,
            ...deleteRepairs
        });
        if (!output)
            throw 'Error in Submit Service Form';  
    }

    return true;
}