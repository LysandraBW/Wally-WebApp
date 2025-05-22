import { DiagnosisUpdates } from "@/pages/employee/edit/service/diagnosis/_DEF";
import { request } from "../request";

export async function UpdateAppointmentDiagnoses(appointmentID: string, updates: DiagnosisUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            request("POST", `/appointment/${appointmentID}/diagnosis/${UPDATE.DiagnosisID}`, {
                code: UPDATE.Code,
                message: UPDATE.Message
            });
        }

        for (const INSERT of updates.Insert) {
            request("PUT", `/appointment/${appointmentID}/diagnosis`, {
                code: INSERT.Code,
                message: INSERT.Message
            });
        }

        for (const DELETE of updates.Delete) {
            request("POST", `/appointment/${appointmentID}/diagnosis/${DELETE.DiagnosisID}`);
        }

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}