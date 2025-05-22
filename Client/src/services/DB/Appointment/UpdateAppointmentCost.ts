import { CostUpdates } from "@/pages/employee/edit/finance/cost/_DEF";
import { request } from "../request";

export async function UpdateAppointmentCost(appointmentID: string, updates: CostUpdates) {
    try {
        request("POST", `/appointment/${appointmentID}/cost`, {
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