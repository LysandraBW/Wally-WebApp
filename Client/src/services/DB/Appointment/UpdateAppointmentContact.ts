import { ContactUpdates } from "@/app/employee/home/update/contact/_DEF";
import { request } from "../request";

export async function UpdateAppointmentContact(appointmentID: string, updates: ContactUpdates) {
    try {
        const output1 = await request("POST", `/appointment/${appointmentID}/customer`, {
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
        
        const output2 = await request("POST", `/appointment/${appointmentID}/date`, {
            startDate,
            endDate
        });

        const output3 = await request("POST", `/appointment/${appointmentID}/status`, {
            statusID: updates.StatusID
        });

        return output1.output && output2.output && output3.output;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}