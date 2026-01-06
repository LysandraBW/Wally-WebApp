import { CostUpdates } from "@/app/employee/home/update/payment/_DEF";
import { request } from "../request";

export async function UpdateAppointmentCost(appointmentID: string, updates: CostUpdates) {
    try {
        const {output} = await request("POST", `/appointment/${appointmentID}/cost`, {
            appointmentID,
            cost: updates.Cost
        });

        return output;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}