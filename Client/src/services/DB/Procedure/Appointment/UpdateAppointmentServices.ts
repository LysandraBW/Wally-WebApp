import { queryDB } from "../../queryDB";
import { ServiceUpdates } from "@/pages/employee/edit/service/service/_DEF";

export async function UpdateAppointmentServices(sessionID: string, appointmentID: string, updates: ServiceUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            queryDB("appointment/updateService", {
                sessionID,
                appointmentID,
                serviceID: UPDATE.AppointmentServiceID,
                class: UPDATE.Class,
                division: UPDATE.Division,
                service: UPDATE.Service,
            });
        }

        for (const INSERT of updates.Insert) {
            queryDB("appointment/insertService", {
                sessionID,
                appointmentID,
                class: INSERT.Class,
                division: INSERT.Division,
                service: INSERT.Service,
            });
        }

        for (const DELETE of updates.Delete) {
            queryDB("appointment/deleteService", {
                sessionID,
                appointmentID,
                serviceID: DELETE.AppointmentServiceID
            });
        }

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}