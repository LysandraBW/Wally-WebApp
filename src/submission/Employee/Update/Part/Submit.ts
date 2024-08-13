import { getSessionID } from "@/lib/Storage/Storage";
import { PartsFormStructure } from "./Form";
import { processPartsForm } from "./Process";
import { DeletePart, InsertPart, UpdatePart } from "@/database/Export";

export async function submitPartsForm(reference: PartsFormStructure, updated: PartsFormStructure): Promise<boolean> {
    const SessionID = await getSessionID();
    const AppointmentID = reference.AppointmentID;
    const processedForm = await processPartsForm(reference, updated);

    for (const updateParts of processedForm.Update) {
        const output = await UpdatePart({
            SessionID,
            AppointmentID,
            ...updateParts
        });
        if (!output)
            throw 'Error in Submit Part Form';   
    }

    for (const insertParts of processedForm.Insert) {
        const output = await InsertPart({
            SessionID,
            AppointmentID,
            ...insertParts
        });
        if (!output)
            throw 'Error in Submit Part Form'; 
    }

    for (const deleteParts of processedForm.Delete) {
        const output = await DeletePart({
            SessionID,
            AppointmentID,
            ...deleteParts
        });
        if (!output)
            throw 'Error in Submit Part Form';   
    }

    return true;
}