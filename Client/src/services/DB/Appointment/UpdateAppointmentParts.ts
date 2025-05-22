import { PartUpdates } from "@/pages/employee/edit/service/part/_DEF";
import { request } from "../request";


export async function UpdateAppointmentParts(appointmentID: string, updates: PartUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            request("POST", `/appointment/${appointmentID}/part/${UPDATE.PartID}`, {
                partID: UPDATE.PartID,
                partName: UPDATE.PartName,
                partNumber: UPDATE.PartNumber,
                quantity: UPDATE.Quantity,
                unitCost: UPDATE.UnitCost
            });
        }

        for (const INSERT of updates.Insert) {
            request("PUT", `/appointment/${appointmentID}/part`, {
                partName: INSERT.PartName,
                partNumber: INSERT.PartNumber,
                quantity: INSERT.Quantity,
                unitCost: INSERT.UnitCost
            });
        }

        for (const DELETE of updates.Delete) {
            request("DELETE", `/appointment/${appointmentID}/part/${DELETE.PartID}`);
        }
        
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}