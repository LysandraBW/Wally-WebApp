import { PartUpdates } from "@/app/employee/home/update/part/_DEF";
import { request } from "../request";


export async function UpdateAppointmentParts(appointmentID: string, updates: PartUpdates) {
    let allOutput = true;

    try {
        for (const UPDATE of updates.Update) {
            const {output} = await request("POST", `/appointment/${appointmentID}/part/${UPDATE.PartID}`, {
                partID: UPDATE.PartID,
                partName: UPDATE.PartName,
                partNumber: UPDATE.PartNumber,
                quantity: UPDATE.Quantity,
                unitCost: UPDATE.UnitCost
            });
            allOutput = allOutput && output === false;
        }

        for (const INSERT of updates.Insert) {
            const {output} = await request("PUT", `/appointment/${appointmentID}/part`, {
                partName: INSERT.PartName,
                partNumber: INSERT.PartNumber,
                quantity: INSERT.Quantity,
                unitCost: INSERT.UnitCost
            });
            allOutput = allOutput && output === false;
        }

        for (const DELETE of updates.Delete) {
            const {output} = await request("DELETE", `/appointment/${appointmentID}/part/${DELETE.PartID}`);
            allOutput = allOutput && output === false;
        }
        
        return allOutput;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}