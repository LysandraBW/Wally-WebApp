import { DiagnosisUpdates } from "@/app/employee/home/update/diagnosis/_DEF";
import { request } from "../request";

export async function UpdateAppointmentDiagnoses(appointmentID: string, updates: DiagnosisUpdates) {
    try {
        let allOutput = true;

        for (const UPDATE of updates.Update) {
            const {output} = await request("POST", `/appointment/${appointmentID}/diagnosis/${UPDATE.DiagnosisID}`, {
                code: UPDATE.Code,
                message: UPDATE.Message
            });
            allOutput = allOutput && output !== false;
        }

        for (const INSERT of updates.Insert) {
            const {output} = await request("PUT", `/appointment/${appointmentID}/diagnosis`, {
                code: INSERT.Code,
                message: INSERT.Message
            });
            allOutput = allOutput && output !== false;
        }

        for (const DELETE of updates.Delete) {
            const {output} = await request("DELETE", `/appointment/${appointmentID}/diagnosis/${DELETE.DiagnosisID}`);
            allOutput = allOutput && output !== false;
        }

        return allOutput;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}