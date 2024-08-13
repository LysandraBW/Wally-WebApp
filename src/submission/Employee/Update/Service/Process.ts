import { MathSet } from "@/lib/Submission/MathSet";
import { ServicesFormStructure } from "./Form";
import { sameObject, updatedValue } from "@/lib/Submission/Compare";

export interface ProcessedServicesFormStructure {
    AppointmentID: string;
    Update: Array<{
        ServiceID: number;
        Service: string | null;
        Division: string | null;
        Class: string | null;
    }>
    Insert: Array<{
        Service: string;
        Division: string;
        Class: string;
    }>
    Delete: Array<{
        ServiceID: number;
    }>
}

export async function processServicesForm(reference: ServicesFormStructure, updated: ServicesFormStructure): Promise<ProcessedServicesFormStructure> {
    const processedServicesForm: ProcessedServicesFormStructure = {
        AppointmentID: updated.AppointmentID,
        Update: [],
        Insert: [],
        Delete: []
    }

    const referenceServiceIDs = new MathSet(Object.keys(reference.Services).map(s => parseInt(s)));
    const updatedServiceIDs = new MathSet(Object.keys(updated.Services).map(s => parseInt(s)));

    const toUpdateServiceIDs = referenceServiceIDs.intersection(updatedServiceIDs);
    const toInsertServiceIDs = updatedServiceIDs.difference(referenceServiceIDs);
    const toDeleteServiceIDs = referenceServiceIDs.difference(updatedServiceIDs);

    toUpdateServiceIDs.forEach((serviceID) => {
        const referenceService = reference.Services[`${serviceID}`];
        const updatedService = updated.Services[`${serviceID}`];

        if (sameObject(referenceService, updatedService, ['Class', 'Division', 'Service']))
            return false;

        processedServicesForm.Update.push({
            ServiceID: serviceID,
            Class: updatedValue(referenceService.Class, updatedService.Class),
            Division: updatedValue(referenceService.Division, updatedService.Division),
            Service: updatedValue(referenceService.Service, updatedService.Service),
        });
    });
    
    toInsertServiceIDs.forEach(serviceID => {
        const updatedService = updated.Services[`${serviceID}`];
        processedServicesForm.Insert.push({
            Class: updatedService.Class,
            Division: updatedService.Division,
            Service: updatedService.Service
        });
    });

    toDeleteServiceIDs.forEach(serviceID => {
        if (serviceID < 0)
            return false;
        processedServicesForm.Delete.push({
            ServiceID: serviceID
        });
    });

    return processedServicesForm;
}