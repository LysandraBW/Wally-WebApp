import { PageContext } from "@/app/Employee/Dashboard/Update/page";
import { UpdateLabel } from "@/database/Export";
import { ContextStructure } from "@/submission/Employee/Update/Context";
import { useContext } from "react";

interface UpdateAppointmentLabelProps {
    updateContext: (context: ContextStructure) => void;
}

export default function UpdateAppointmentLabel(props: UpdateAppointmentLabelProps) {
    const context = useContext(PageContext);
    
    const updateAppointmentLabel = async (labelName: string) => {
        const output = await UpdateLabel({
            SessionID: context.Employee.SessionID,
            AppointmentID: context.Appointment.AppointmentID,
            LabelID: context.Appointment.Labels[`${labelName}`].LabelID
        });

        if (!output)
            throw 'Update Appointment Label Error';

        props.updateContext({
            ...context, 
            Appointment: {
                ...context.Appointment,
                Labels: {                    
                    ...context.Appointment.Labels,
                    [`${labelName}`]: {
                        ...context.Appointment.Labels[`${labelName}`],
                        Value: 1 - context.Appointment.Labels[`${labelName}`].Value
                    }
                }
            }
        });
    }
    
    return (
        <div>
            <div onClick={async () => updateAppointmentLabel('Flag')}>
                {!!context.Appointment.Labels.Flag.Value ? 'Flagged' : 'Not Flagged'}
            </div>
            <div onClick={async () => updateAppointmentLabel('Star')}>
                {!!context.Appointment.Labels.Star.Value ? 'Starred' : 'Not Starred'}
            </div>
        </div>
    )
}