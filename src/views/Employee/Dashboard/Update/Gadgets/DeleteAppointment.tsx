import { PageContext } from "@/app/Employee/Dashboard/Update/page";
import { Delete } from "@/database/Export";
import { goToDashboard } from "@/lib/Navigation/Redirect";
import { useContext } from "react";

export default function DeleteAppointment() {
    const context = useContext(PageContext);
    
    const deleteAppointment = async () => {
        const output = await Delete({
            SessionID: context.Employee.SessionID,
            AppointmentID: context.Appointment.AppointmentID
        });
        
        if (!output)
            throw 'Couldn\'t Delete Appointment';

        await goToDashboard();
    }

    return (
        <div onClick={async () => deleteAppointment()}>
            Delete Appointment
        </div>
    )
}