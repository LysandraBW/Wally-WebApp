import { CostUpdates } from "@/pages/employee/edit/finance/cost/_DEF";
import { queryDB } from "../../queryDB";

export async function UpdateAppointmentCost(sessionID: string, appointmentID: string, updates: CostUpdates) {
    try {
        queryDB("appointment/updateCost", {
            sessionID,
            appointmentID,
            cost: updates.Cost
        });

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}