import { PartUpdates } from "@/pages/employee/edit/service/part/_DEF";
import { queryDB } from "../../queryDB";

export async function UpdateAppointmentParts(sessionID: string, appointmentID: string, updates: PartUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            queryDB("appointment/updatePart", {
                sessionID,
                appointmentID,
                partID: UPDATE.PartID,
                partName: UPDATE.PartName,
                partNumber: UPDATE.PartNumber,
                quantity: UPDATE.Quantity,
                unitCost: UPDATE.UnitCost
            });
        }

        for (const INSERT of updates.Insert) {
            queryDB("appointment/insertPart", {
                sessionID,
                appointmentID,
                partName: INSERT.PartName,
                partNumber: INSERT.PartNumber,
                quantity: INSERT.Quantity,
                unitCost: INSERT.UnitCost
            });
        }

        for (const DELETE of updates.Delete) {
            queryDB("appointment/deletePart", {
                sessionID,
                appointmentID,
                partID: DELETE.PartID
            });
        }
        
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}