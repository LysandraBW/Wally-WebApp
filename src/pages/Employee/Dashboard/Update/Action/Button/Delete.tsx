import { PageContext } from "@/app/employee/Dashboard/update/page";
import { Delete } from "@/db/export";
import { goToDashboard } from "@/lib/navigation/navigation";
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