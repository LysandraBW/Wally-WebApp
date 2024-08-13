import { MathSet } from "@/lib/Submission/MathSet";
import { sameObject, updatedValue } from "@/lib/Submission/Compare";
import { DiagnosesFormStructure } from "./Form";

export interface ProcessedDiagnosesFormStructure {
    AppointmentID: string;
    Update: Array<{
        DiagnosisID: number;
        Code: string | null;
        Message: string | null;
    }>
    Insert: Array<{
        Code: string;
        Message: string;
    }>
    Delete: Array<{
        DiagnosisID: number;
    }>
}

export async function processDiagnosesForm(ref: DiagnosesFormStructure, cur: DiagnosesFormStructure) {
    const processedDiagnosesForm: ProcessedDiagnosesFormStructure = {
        AppointmentID: ref.AppointmentID,
        Update: [],
        Insert: [],
        Delete: []
    }

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

        processedDiagnosesForm.Update.push({
            DiagnosisID: diagnosisID,
            Code: updatedValue(refDiagnosis.Code, curDiagnosis.Code),
            Message: updatedValue(refDiagnosis.Message, curDiagnosis.Message),
        });
    });

    toInsertDiagnosisIDs.forEach((diagnosisID) => {
        const curDiagnosis = cur.Diagnoses[`${diagnosisID}`];
        processedDiagnosesForm.Insert.push({
            Code: curDiagnosis.Code,
            Message: curDiagnosis.Message
        });
    });

    toDeleteDiagnosisIDs.forEach((diagnosisID) => {
        if (diagnosisID < 0)
            return false;
        processedDiagnosesForm.Delete.push({
            DiagnosisID: diagnosisID
        });
    });

    return processedDiagnosesForm;
}