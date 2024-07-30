import Tuple from "./Tuple";
import { UpdateLabel } from "@/database/Export";
import { useContext } from "react";
import { PageContext } from "@/app/Employee/Dashboard/Dashboard/page";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { DB_AllAppointmentLabels, DB_AppointmentOverview } from "@/database/Types";
import { updateAppointmentLabel } from "@/database/Appointment/Label/Helper";

interface BodyProps {
    current: Array<DB_AppointmentOverview>;
    search: string;
    openAppointment: (appointmentID: string) => void;
    deleteAppointment: (IDs: Array<string>) => void;
    checked: Array<string>;
    setChecked: (checked: Array<string>) => any;
    allLabels: DB_AllAppointmentLabels;
    setLabels: (label: DB_AllAppointmentLabels) => void;
}

export default function Body(props: BodyProps) {
    const context = useContext(PageContext);

    const updateLabel = async (appointmentID: string, labelName: string) => {
        const updatedLabels = updateAppointmentLabel(
            labelName,
            appointmentID, 
            props.allLabels
        ); 

        const output = await UpdateLabel({
            SessionID: context.Employee.SessionID, 
            AppointmentID: appointmentID, 
            LabelID: props.allLabels[`${appointmentID}`][`${labelName}`].LabelID
        });

        if (!output)
            return;

        props.setLabels(updatedLabels);
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
                    <Tuple
                        appointment={appointment}
                        labels={props.allLabels[`${appointment.AppointmentID}`]}
                        updateLabel={updateLabel}
                        checked={props.checked.includes(appointment.AppointmentID)}
                        checkAppointment={(appointmentID: string) => props.setChecked(toggleValue(props.checked, appointmentID))}
                        deleteAppointment={props.deleteAppointment}
                        search={props.search}
                    />  
                </tr>                  
            ))}
        </tbody>
    )
}