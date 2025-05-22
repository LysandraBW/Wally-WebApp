import { ServiceUpdates } from "@/pages/employee/edit/service/service/_DEF";
import { request } from "../request";

export async function UpdateAppointmentServices(appointmentID: string, updates: ServiceUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            request("POST", `/appointment/${appointmentID}/service/${UPDATE.AppointmentServiceID}`, {
                class: UPDATE.Class,
                division: UPDATE.Division,
                service: UPDATE.Service,
            });
        }

        for (const INSERT of updates.Insert) {
            request("PUT", `/appointment/${appointmentID}/service`, {
                class: INSERT.Class,
                division: INSERT.Division,
                service: INSERT.Service,
            });
        }

        for (const DELETE of updates.Delete) {
            request("DELETE", `/appointment/${appointmentID}/service/${DELETE.AppointmentServiceID}`);
        }

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}