import { RepairUpdates } from "@/pages/employee/edit/service/repair/_DEF";
import { queryDB } from "../../queryDB";

export async function UpdateAppointmentRepairs(sessionID: string, appointmentID: string, updates: RepairUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            queryDB("appointment/updateRepair", {
                sessionID,
                appointmentID,
                repairID: UPDATE.RepairID,
                repair: UPDATE.Repair
            });
        }

        for (const INSERT of updates.Insert) {
            queryDB("appointment/insertRepair", {
                sessionID,
                appointmentID,
                repair: INSERT.Repair,
            });
        }

        for (const DELETE of updates.Delete) {
            queryDB("appointment/deleteRepair", {
                sessionID,
                appointmentID,
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