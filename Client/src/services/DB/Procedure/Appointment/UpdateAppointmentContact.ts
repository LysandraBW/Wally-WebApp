import { ContactUpdates } from "@/pages/employee/edit/contact/_DEF";
import { queryDB } from "../../queryDB";

export async function UpdateAppointmentContact(sessionID: string, appointmentID: string, updates: ContactUpdates) {
    try {
        queryDB("customer/updateCustomer", {
            sessionID,
            appointmentID,
            fName: updates.FName,
            lName: updates.LName,
            email: updates.Email,
            phone: updates.Phone
        });

        queryDB("appointment/updateDate", {
            sessionID,
            appointmentID,
            startDate: updates.StartDate,
            endDate: updates.EndDate
        });

        queryDB("appointment/updateStatus", {
            sessionID,
            appointmentID,
            statusID: updates.StatusID
        });

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}