import Appointment from "./Appointment";
import { UpdateLabel } from "@/database/Export";
import { useContext } from "react";
import { toggleValue } from "@/lib/Input/Toggle";
import { DB_AllAppointmentLabels, DB_AppointmentOverview } from "@/database/Types";
import { updateAppointmentLabel } from "@/database/Appointment/Label/Helper";
import { PageContext } from "@/process/Employee/Dashboard/Context";

interface BodyProps {
    search: string;
    checked: Array<string>;
    labels: DB_AllAppointmentLabels;
    current: Array<DB_AppointmentOverview>;
    openAppointment: (appointmentID: string) => void;
    deleteAppointment: (IDs: Array<string>) => void;
    updateChecked: (checked: Array<string>) => any;
    updateLabels: (label: DB_AllAppointmentLabels) => void;
}

export default function Body(props: BodyProps) {
    const context = useContext(PageContext);

    const updateLabel = async (appointmentID: string, labelName: string) => {
        const updatedLabels = updateAppointmentLabel(
            labelName,
            appointmentID, 
            props.labels
        ); 

        if (!(await UpdateLabel({
            SessionID: context.Employee.SessionID, 
            AppointmentID: appointmentID, 
            LabelID: props.labels[`${appointmentID}`][`${labelName}`].LabelID
        })))
            return;

        props.updateLabels(updatedLabels);
    }

    return (
        <tbody>
            {props.current.map(appointment => (
                <tr 
                    key={appointment.AppointmentID}
                    onClick={() => {
                        props.openAppointment(appointment.AppointmentID);
                        updateLabel(appointment.AppointmentID, 'Seen');
                    }}
                >
                    <Appointment
                        search={props.search}
                        appointment={appointment}
                        appointmentLabels={props.labels[`${appointment.AppointmentID}`]}
                        isChecked={props.checked.includes(appointment.AppointmentID)}
                        updateLabel={updateLabel}
                        deleteAppointment={props.deleteAppointment}
                        checkAppointment={appointmentID => props.updateChecked(toggleValue(props.checked, appointmentID))}
                    />  
                </tr>
            ))}
        </tbody>
    )
}