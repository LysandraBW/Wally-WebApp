import { sameObject, updatedValue } from "@/lib/Submission/Compare";
import { MathSet } from "@/lib/Submission/MathSet";
import { ServiceFormStructure } from "./Form";
import { toInteger } from "@/lib/Convert/Convert";

export interface ProcessedServiceFormStructure {
    AppointmentID: string;
    Update: {
        Services: Array<{
            ServiceID: number;
            Service: string | null;
            Division: string | null;
            Class: string | null;
        }>
        Diagnoses: Array<{
            DiagnosisID: number;
            Code: string | null;
            Message: string | null;
        }>
        Repairs: Array<{
            RepairID: number;
            Repair: string | null;
        }>
        Parts: Array<{
            PartID: number;
            PartName: string | null;
            PartNumber: string | null;
            Quantity: number | null;
            UnitCost: number | null;
        }>
    }
    Insert: {
        Services: Array<{
            Service: string;
            Division: string;
            Class: string;
        }>;
        Diagnoses: Array<{
            Code: string;
            Message: string;
        }>
        Repairs: Array<{
            Repair: string;
        }>
        Parts: Array<{
            PartName: string;
            PartNumber: string;
            Quantity: number;
            UnitCost: number;
        }>
    }
    Delete: {
        Services: Array<{
            ServiceID: number;
        }>
        Diagnoses: Array<{
            DiagnosisID: number;
        }>
        Repairs: Array<{
            RepairID: number;
        }>
        Parts: Array<{
            PartID: number;
        }>
    }
}

export async function processServiceForm(
    ref: ServiceFormStructure,
    cur: ServiceFormStructure
): Promise<ProcessedServiceFormStructure> {
    const processedServicesForm: ProcessedServiceFormStructure = {
        AppointmentID: cur.AppointmentID,
        Update: {
            Services: [],
            Diagnoses: [],
            Repairs: [],
            Parts: []
        },
        Insert: {
            Services: [],
            Diagnoses: [],
            Repairs: [],
            Parts: []
        },
        Delete: {
            Services: [],
            Diagnoses: [],
            Repairs: [],
            Parts: []
        }
    }

    // Diagnoses
    const refDiagnosisIDs = new MathSet(Object.keys(ref.Diagnoses).map(s => parseInt(s)));
    const curDiagnosisIDs = new MathSet(Object.keys(cur.Diagnoses).map(s => parseInt(s)));

    const toUpdateDiagnosisIDs = refDiagnosisIDs.intersection(curDiagnosisIDs);
    const toInsertDiagnosisIDs = curDiagnosisIDs.difference(refDiagnosisIDs);
    const toDeleteDiagnosisIDs = refDiagnosisIDs.difference(curDiagnosisIDs);

    toUpdateDiagnosisIDs.forEach((diagnosisID) => {
        const refDiagnosis = ref.Diagnoses[`${diagnosisID}`];
        const curDiagnosis = cur.Diagnoses[`${diagnosisID}`];

        if (sameObject(refDiagnosis, curDiagnosis, ['Code', 'Message']))
            return false;

        processedServicesForm.Update.Diagnoses.push({
            DiagnosisID: diagnosisID,
            Code: updatedValue(refDiagnosis.Code, curDiagnosis.Code),
            Message: updatedValue(refDiagnosis.Message, curDiagnosis.Message),
        });
    });

    toInsertDiagnosisIDs.forEach((diagnosisID) => {
        const curDiagnosis = cur.Diagnoses[`${diagnosisID}`];
        processedServicesForm.Insert.Diagnoses.push({
            Code: curDiagnosis.Code,
            Message: curDiagnosis.Message
        });
    });

    toDeleteDiagnosisIDs.forEach((diagnosisID) => {
        if (diagnosisID < 0)
            return false;
        processedServicesForm.Delete.Diagnoses.push({
            DiagnosisID: diagnosisID
        });
    });

    // Repairs
    const refRepairIDs = new MathSet(Object.keys(ref.Repairs).map(s => parseInt(s)));
    const curRepairIDs = new MathSet(Object.keys(cur.Repairs).map(s => parseInt(s)));

    const toUpdateRepairIDs = refRepairIDs.intersection(curRepairIDs);
    const toInsertRepairIDs = curRepairIDs.difference(refRepairIDs);
    const toDeleteRepairIDs = refRepairIDs.difference(curRepairIDs);

    toUpdateRepairIDs.forEach((repairID) => {
        const refRepairs = ref.Repairs[`${repairID}`];
        const curRepairs = cur.Repairs[`${repairID}`];

        if (sameObject(refRepairs, curRepairs, ['Code', 'Message']))
            return false;

        processedServicesForm.Update.Repairs.push({
            RepairID: repairID,
            Repair: updatedValue(refRepairs.Repair, curRepairs.Repair),
        });
    });

    toInsertRepairIDs.forEach((repairID) => {
        const curRepairs = cur.Repairs[`${repairID}`];
        processedServicesForm.Insert.Repairs.push({
            Repair: curRepairs.Repair
        });
    });

    toDeleteRepairIDs.forEach((repairID) => {
        if (repairID < 0)
            return false;
        processedServicesForm.Delete.Repairs.push({
            RepairID: repairID
        });
    });

    // Parts
    const refPartIDs = new MathSet(Object.keys(ref.Parts).map(s => parseInt(s)));
    const curPartIDs = new MathSet(Object.keys(cur.Parts).map(s => parseInt(s)));

    const toUpdatePartIDs = refPartIDs.intersection(curPartIDs);
    const toInsertPartIDs = curPartIDs.difference(refPartIDs);
    const toDeletePartIDs = refPartIDs.difference(curPartIDs);

    toUpdatePartIDs.forEach((partID) => {
        const refParts = ref.Parts[`${partID}`];
        const curParts = cur.Parts[`${partID}`];

        if (sameObject(refParts, curParts, ['PartName', 'PartNumber', 'Quantity', 'UnitCost']))
            return false;
        
        processedServicesForm.Update.Parts.push({
            PartID: partID,
            PartName: updatedValue(refParts.PartName, curParts.PartName),
            PartNumber: updatedValue(refParts.PartNumber, curParts.PartNumber),
            Quantity: updatedValue(toInteger(refParts.Quantity), toInteger(curParts.Quantity)),
            UnitCost: updatedValue(toInteger(refParts.UnitCost), toInteger(curParts.UnitCost)),
        });
    });

    toInsertPartIDs.forEach((partID) => {
        const curParts = cur.Parts[`${partID}`];
        processedServicesForm.Insert.Parts.push({
            PartName: curParts.PartName,
            PartNumber: curParts.PartNumber,
            Quantity: toInteger(curParts.Quantity),
            UnitCost: toInteger(curParts.UnitCost)
        });
    });

    toDeletePartIDs.forEach((partID) => {
        if (partID < 0)
            return false;
        processedServicesForm.Delete.Parts.push({
            PartID: partID
        });
    });

    return processedServicesForm;
}