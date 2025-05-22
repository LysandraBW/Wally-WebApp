import { RepairUpdates } from "@/pages/employee/edit/service/repair/_DEF";
import { request } from "../request";

export async function UpdateAppointmentRepairs(appointmentID: string, updates: RepairUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            request("POST", `/appointment/${appointmentID}/repair/${UPDATE.RepairID}`, {
                repairID: UPDATE.RepairID,
                repair: UPDATE.Repair
            });
        }

        for (const INSERT of updates.Insert) {
            request("PUT", `/appointment/${appointmentID}/repair`, {
                repair: INSERT.Repair,
            });
        }

        for (const DELETE of updates.Delete) {
            request("DELETE", `/appointment/${appointmentID}/repair/${DELETE.RepairID}`, {
                repairID: DELETE.RepairID
            });
        }

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}