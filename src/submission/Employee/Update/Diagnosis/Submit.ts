import { getSessionID } from "@/lib/Storage/Storage";
import { DiagnosesFormStructure } from "./Form";
import { processDiagnosesForm } from "./Process";
import { DeleteDiagnosis, InsertDiagnosis, UpdateDiagnosis } from "@/database/Export";

export async function submitDiagnosesForm(reference: DiagnosesFormStructure, current: DiagnosesFormStructure): Promise<boolean> {
    const SessionID = await getSessionID();
    const AppointmentID = reference.AppointmentID;

    const processedForm = await processDiagnosesForm(reference, current);

    for (const updateDiagnosis of processedForm.Update) {
        const output = await UpdateDiagnosis({
            SessionID,
            AppointmentID,
            ...updateDiagnosis
        });
        if (!output)
            throw 'Error in Submit Diagnosis Form';   
    }

    for (const insertDiagnosis of processedForm.Insert) {
        const output = await InsertDiagnosis({
            SessionID,
            AppointmentID,
            ...insertDiagnosis
        });
        if (!output)
            throw 'Error in Submit Diagnosis Form';
    }

    for (const deleteDiagnosis of processedForm.Delete) {
        const output = await DeleteDiagnosis({
            SessionID,
            AppointmentID,
            ...deleteDiagnosis
        });
        if (!output)
            throw 'Error in Submit Diagnosis Form';
    }

    return true;
}