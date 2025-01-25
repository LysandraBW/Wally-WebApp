import { queryDB } from "../../queryDB";
import { DiagnosisUpdates } from "@/pages/employee/edit/service/diagnosis/_DEF";

export async function UpdateAppointmentDiagnoses(sessionID: string, appointmentID: string, updates: DiagnosisUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            queryDB("appointment/updateDiagnosis", {
                sessionID,
                appointmentID,
                diagnosisID: UPDATE.DiagnosisID,
                code: UPDATE.Code,
                message: UPDATE.Message
            });
        }

        for (const INSERT of updates.Insert) {
            queryDB("appointment/insertDiagnosis", {
                sessionID,
                appointmentID,
                code: INSERT.Code,
                message: INSERT.Message
            });
        }

        for (const DELETE of updates.Delete) {
            queryDB("appointment/deleteDiagnosis", {
                sessionID,
                appointmentID,
                diagnosisID: DELETE.DiagnosisID
            });
        }

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}