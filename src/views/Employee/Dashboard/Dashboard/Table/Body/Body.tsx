import Appointment from "./Row";
import { UpdateLabel } from "@/database/Export";
import { useContext } from "react";
import { toggleValue } from "@/lib/Input/Toggle";
import { DB_AllAppointmentLabels, DB_AppointmentOverview } from "@/database/Types";
import { updateAppointmentLabel } from "@/database/Appointment/Label/Helper";
import { PageContext } from "@/process/Employee/Dashboard/Context";

interface BodyProps {
    current: Array<DB_AppointmentOverview>;
    openAppointment: (appointmentID: string) => void;
    deleteAppointment: (IDs: Array<string>) => void;
    checked: Array<string>;
    updateChecked: (checked: Array<string>) => any;
    labels: DB_AllAppointmentLabels;
    updateLabels: (label: DB_AllAppointmentLabels) => void;
    search: string;
}

export default function Body(props: BodyProps) {
    const context = useContext(PageContext);

    const updateLabel = async (appointmentID: string, labelName: string) => {
        const updatedLabels = updateAppointmentLabel(
            labelName,
            appointmentID, 
            props.labels
        ); 

        const output = await UpdateLabel({
            SessionID: context.Employee.SessionID, 
            AppointmentID: appointmentID, 
            LabelID: props.labels[`${appointmentID}`][`${labelName}`].LabelID
        });

        if (!output)
            return;

        props.updateLabels(updatedLabels);
    }

    return (
        <tbody>
            {props.current.map((appointment, i) => (
                <tr 
                    key={appointment.AppointmentID}
                    onClick={() => {
                        props.openAppointment(appointment.AppointmentID);
                        updateLabel(appointment.AppointmentID, 'Seen');
                    }}
                >
                    <Appointment
                        appointment={appointment}
                        labels={props.labels[`${appointment.AppointmentID}`]}
                        updateLabel={updateLabel}
                        isChecked={props.checked.includes(appointment.AppointmentID)}
                        checkAppointment={(appointmentID: string) => props.updateChecked(toggleValue(props.checked, appointmentID))}
                        deleteAppointment={props.deleteAppointment}
                        search={props.search}
                    />  
                </tr>                  
            ))}
        </tbody>
    )
}