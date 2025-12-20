import { RepairUpdates } from "@/app/employee/home/update/repair/_DEF";
import { request } from "../request";

export async function UpdateAppointmentRepairs(appointmentID: string, updates: RepairUpdates) {
    try {
        let allOutput = true;

        for (const UPDATE of updates.Update) {
            const {output} = await request("POST", `/appointment/${appointmentID}/repair/${UPDATE.RepairID}`, {
                repairID: UPDATE.RepairID,
                repair: UPDATE.Repair
            });
            allOutput = allOutput && output !== false;
        }

        for (const INSERT of updates.Insert) {
            const {output} = await request("PUT", `/appointment/${appointmentID}/repair`, {
                repair: INSERT.Repair,
            });
            allOutput = allOutput && output !== false;
        }

        for (const DELETE of updates.Delete) {
            const {output} = await request("DELETE", `/appointment/${appointmentID}/repair/${DELETE.RepairID}`, {
                repairID: DELETE.RepairID
            });
            allOutput = allOutput && output !== false;
        }

        return allOutput;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}