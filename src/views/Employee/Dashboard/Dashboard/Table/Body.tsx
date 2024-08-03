import AptRow from "./Row";
import { UpdateLabel } from "@/database/Export";
import { useContext } from "react";
import { DefaultPageContext } from "@/app/Employee/Dashboard/Dashboard/page";
import { toggleValue } from "@/lib/Input/Toggle";
import { DB_AllAppointmentLabels, DB_AppointmentOverview } from "@/database/Types";
import { updateAppointmentLabel } from "@/database/Appointment/Label/Helper";

interface BodyProps {
    current: Array<DB_AppointmentOverview>;
    openAppointment: (appointmentID: string) => void;
    deleteAppointment: (IDs: Array<string>) => void;
    checkedAppointments: Array<string>;
    updateChecked: (checked: Array<string>) => any;
    allLabels: DB_AllAppointmentLabels;
    updateLabels: (label: DB_AllAppointmentLabels) => void;
    search: string;
}

export default function Body(props: BodyProps) {
    const context = useContext(DefaultPageContext);

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
                    <AptRow
                        appointment={appointment}
                        labels={props.allLabels[`${appointment.AppointmentID}`]}
                        updateLabel={updateLabel}
                        isChecked={props.checkedAppointments.includes(appointment.AppointmentID)}
                        checkAppointment={(appointmentID: string) => props.updateChecked(toggleValue(props.checkedAppointments, appointmentID))}
                        deleteAppointment={props.deleteAppointment}
                        search={props.search}
                    />  
                </tr>                  
            ))}
        </tbody>
    )
}