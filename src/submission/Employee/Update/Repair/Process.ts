import { MathSet } from "@/lib/Submission/MathSet";
import { RepairsFormStructure } from "./Form";
import { sameObject, updatedValue } from "@/lib/Submission/Compare";

export interface ProcessedRepairsFormStructure {
    AppointmentID: string;
    Update: Array<{
        RepairID: number;
        Repair: string | null;
    }>
    Insert: Array<{
        Repair: string;
    }>
    Delete: Array<{
        RepairID: number;
    }>
}

export async function processRepairsForm(reference: RepairsFormStructure, current: RepairsFormStructure) {
    const processedRepairsForm: ProcessedRepairsFormStructure = {
        AppointmentID: reference.AppointmentID,
        Update: [],
        Insert: [],
        Delete: []
    }

    const refRepairIDs = new MathSet(Object.keys(reference.Repairs).map(s => parseInt(s)));
    const curRepairIDs = new MathSet(Object.keys(current.Repairs).map(s => parseInt(s)));

    const toUpdateRepairIDs = refRepairIDs.intersection(curRepairIDs);
    const toInsertRepairIDs = curRepairIDs.difference(refRepairIDs);
    const toDeleteRepairIDs = refRepairIDs.difference(curRepairIDs);

    toUpdateRepairIDs.forEach((repairID) => {
        const refRepairs = reference.Repairs[`${repairID}`];
        const curRepairs = current.Repairs[`${repairID}`];

        if (sameObject(refRepairs, curRepairs, ['Code', 'Message']))
            return false;

        processedRepairsForm.Update.push({
            RepairID: repairID,
            Repair: updatedValue(refRepairs.Repair, curRepairs.Repair),
        });
    });

    toInsertRepairIDs.forEach((repairID) => {
        const curRepairs = current.Repairs[`${repairID}`];
        processedRepairsForm.Insert.push({
            Repair: curRepairs.Repair
        });
    });

    toDeleteRepairIDs.forEach((repairID) => {
        if (repairID < 0)
            return false;
        processedRepairsForm.Delete.push({
            RepairID: repairID
        });
    });

    return processedRepairsForm;
}