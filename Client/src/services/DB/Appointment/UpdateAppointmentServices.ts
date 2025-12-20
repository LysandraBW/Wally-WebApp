import { ServiceUpdates } from "@/app/employee/home/update/service/_DEF";
import { request } from "../request";

export async function UpdateAppointmentServices(appointmentID: string, updates: ServiceUpdates) {
    try {
        let allOutput = true;

        for (const UPDATE of updates.Update) {
            const {output} = await request("POST", `/appointment/${appointmentID}/service/${UPDATE.AppointmentServiceID}`, {
                class: UPDATE.Class,
                division: UPDATE.Division,
                service: UPDATE.Service,
            });
            allOutput = allOutput && output === false;
        }

        for (const INSERT of updates.Insert) {
            const {output} = await request("PUT", `/appointment/${appointmentID}/service`, {
                class: INSERT.Class,
                division: INSERT.Division,
                service: INSERT.Service,
            });
            allOutput = allOutput && output === false;
        }

        for (const DELETE of updates.Delete) {
            const {output} = await request("DELETE", `/appointment/${appointmentID}/service/${DELETE.AppointmentServiceID}`);
            allOutput = allOutput && output === false;
        }

        return allOutput;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}