import { getSessionID } from "@/lib/Storage/Storage";
import { ServiceFormStructure } from "./Service";
import { ProcessedServiceFormStructure, processServiceForm } from "./Process";
import { DeletePart, DeleteDiagnosis, DeleteRepair, DeleteService, InsertDiagnosis, InsertPart, InsertRepair, InsertService, UpdateDiagnosis, UpdatePart, UpdateRepair, UpdateService } from "@/database/Export";

export async function submitServiceForm(reference: ServiceFormStructure, current: ServiceFormStructure): Promise<boolean> {
    const processedForm: ProcessedServiceFormStructure = await processServiceForm(reference, current);
    const SessionID = await getSessionID();
    const AppointmentID = processedForm.AppointmentID;
    
    for (const updateService of processedForm.Update.Services) {
        const output = await UpdateService({
            SessionID,
            AppointmentID,
            ...updateService
        });
        if (!output)
            throw 'Error in Submit Service Form';
    }

    for (const updateDiagnosis of processedForm.Update.Diagnoses) {
        const output = await UpdateDiagnosis({
            SessionID,
            AppointmentID,
            ...updateDiagnosis
        });
        if (!output)
            throw 'Error in Submit Service Form';
        
    }

    for (const updateRepairs of processedForm.Update.Repairs) {
        const output = await UpdateRepair({
            SessionID,
            AppointmentID,
            ...updateRepairs
        });
        if (!output)
            throw 'Error in Submit Service Form';
        
    }

    for (const updateParts of processedForm.Update.Parts) {
        const output = await UpdatePart({
            SessionID,
            AppointmentID,
            ...updateParts
        });
        if (!output)
            throw 'Error in Submit Service Form';
        
    }

    for (const insertService of processedForm.Insert.Services) {
        const output = await InsertService({
            SessionID,
            AppointmentID,
            ...insertService
        });
        if (!output)
            throw 'Error in Submit Service Form';
    }

    for (const insertDiagnosis of processedForm.Insert.Diagnoses) {
        const output = await InsertDiagnosis({
            SessionID,
            AppointmentID,
            ...insertDiagnosis
        });
        if (!output)
            throw 'Error in Submit Service Form';
        
    }

    for (const insertRepairs of processedForm.Insert.Repairs) {
        const output = await InsertRepair({
            SessionID,
            AppointmentID,
            ...insertRepairs
        });
        if (!output)
            throw 'Error in Submit Service Form';
    }

    for (const insertParts of processedForm.Insert.Parts) {
        const output = await InsertPart({
            SessionID,
            AppointmentID,
            ...insertParts
        });
        if (!output)
            throw 'Error in Submit Service Form'; 
    }

    for (const deleteService of processedForm.Delete.Services) {
        const output = await DeleteService({
            SessionID,
            AppointmentID,
            ...deleteService
        });
        if (!output)
            throw 'Error in Submit Service Form';
    }

    for (const deleteDiagnosis of processedForm.Delete.Diagnoses) {
        const output = await DeleteDiagnosis({
            SessionID,
            AppointmentID,
            ...deleteDiagnosis
        });
        if (!output)
            throw 'Error in Submit Service Form';
    }

    for (const deleteRepairs of processedForm.Delete.Repairs) {
        const output = await DeleteRepair({
            SessionID,
            AppointmentID,
            ...deleteRepairs
        });
        if (!output)
            throw 'Error in Submit Service Form';  
    }

    for (const deleteParts of processedForm.Delete.Parts) {
        const output = await DeletePart({
            SessionID,
            AppointmentID,
            ...deleteParts
        });
        if (!output)
            throw 'Error in Submit Service Form';   
    }

    return true;
}

