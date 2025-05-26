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

        let startDate = updates.StartDate;
        if (startDate)
            startDate = startDate.replace("T", " ") + ":00";

        let endDate = updates.EndDate;
        if (endDate)
            endDate = endDate.replace("T", " ") + ":00"
        request("POST", `/appointment/${appointmentID}/date`, {
            startDate,
            endDate
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