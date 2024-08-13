import { MathSet } from "@/lib/Submission/MathSet";
import { PartsFormStructure } from "./Form";
import { sameObject, updatedValue } from "@/lib/Submission/Compare";
import { toInteger } from "@/lib/Convert/Convert";

export interface ProcessedPartsFormStructure {
    AppointmentID: string;
    Update: Array<{
            PartID: number;
            PartName: string | null;
            PartNumber: string | null;
            Quantity: number | null;
            UnitCost: number | null;
    }>
    Insert: Array<{
        PartName: string;
        PartNumber: string;
        Quantity: number;
        UnitCost: number;
    }>
    Delete: Array<{
        PartID: number;
    }>
}

export async function processPartsForm(reference: PartsFormStructure, updated: PartsFormStructure): Promise<ProcessedPartsFormStructure> {
    const processedPartsForm: ProcessedPartsFormStructure = {
        AppointmentID: reference.AppointmentID,
        Update: [],
        Insert: [],
        Delete: []
    }

    const refPartIDs = new MathSet(Object.keys(reference.Parts).map(s => parseInt(s)));
    const curPartIDs = new MathSet(Object.keys(updated.Parts).map(s => parseInt(s)));

    const toUpdatePartIDs = refPartIDs.intersection(curPartIDs);
    const toInsertPartIDs = curPartIDs.difference(refPartIDs);
    const toDeletePartIDs = refPartIDs.difference(curPartIDs);

    toUpdatePartIDs.forEach((partID) => {
        const refParts = reference.Parts[`${partID}`];
        const curParts = updated.Parts[`${partID}`];

        if (sameObject(refParts, curParts, ['PartName', 'PartNumber', 'Quantity', 'UnitCost']))
            return false;
        
        processedPartsForm.Update.push({
            PartID: partID,
            PartName: updatedValue(refParts.PartName, curParts.PartName),
            PartNumber: updatedValue(refParts.PartNumber, curParts.PartNumber),
            Quantity: updatedValue(toInteger(refParts.Quantity), toInteger(curParts.Quantity)),
            UnitCost: updatedValue(toInteger(refParts.UnitCost), toInteger(curParts.UnitCost)),
        });
    });

    toInsertPartIDs.forEach((partID) => {
        const curParts = updated.Parts[`${partID}`];
        processedPartsForm.Insert.push({
            PartName: curParts.PartName,
            PartNumber: curParts.PartNumber,
            Quantity: toInteger(curParts.Quantity),
            UnitCost: toInteger(curParts.UnitCost)
        });
    });

    toDeletePartIDs.forEach((partID) => {
        if (partID < 0)
            return false;
        processedPartsForm.Delete.push({
            PartID: partID
        });
    });

    return processedPartsForm;
}