import { ContactUpdates } from "@/pages/employee/edit/contact/_DEF";
import { request } from "../request";

export async function UpdateAppointmentContact(appointmentID: string, updates: ContactUpdates) {
    try {
        request("POST", `/appointment/${appointmentID}/customer`, {
            fName: updates.FName,
            lName: updates.LName,
            email: updates.Email,
            phone: updates.Phone
        });

        request("POST", `/appointment/${appointmentID}/date`, {
            startDate: updates.StartDate,
            endDate: updates.EndDate
        });

        request("POST", `/appointment/${appointmentID}/status`, {
            statusID: updates.StatusID
        });

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}