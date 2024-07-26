import React from "react";
import { DB_AppointmentOverview, DB_EmployeeLabel, DB_Label } from "@/lib/Database/Types";
import { getLabel } from "@/lib/Database/Appointment/Label/Select";

interface AppointmentProps {
    app: DB_AppointmentOverview;
    labels: Array<DB_EmployeeLabel>;
    labelMeta: {[k: string]: DB_Label};
    updateLabel: (appID: string, labelName: string) => any;
    checked: boolean;
    checkAppointment: (appID: string) => void;
    highlight: (entry: string) => React.ReactNode;
    deleteAppointment: (appIDs: Array<string>) => void;
}

export default async function Appointment(props: AppointmentProps) {
    const labelHandler = async (labelName: string) => {
        props.updateLabel(props.app.AppointmentID, labelName);
    }
    
    return (
        <React.Fragment>
            <td>
                <input 
                    type='checkbox' 
                    onChange={() => {
                        props.checkAppointment(props.app.AppointmentID);
                    }}
                    checked={props.checked}
                />
            </td>
            <td>
                <input 
                    type='checkbox'
                    onChange={() => labelHandler('Star')}
                    checked={!!(await getLabel(props.labels, 'Star'))}
                />
            </td>
            <td>
                <input 
                    type='checkbox'
                    onChange={() => labelHandler('Flag')}
                    checked={!!(await getLabel(props.labels, 'Flag'))}
                />
            </td>
            <td>{props.highlight(props.app.FName)}</td>
            <td>{props.highlight(props.app.LName)}</td>
            <td>{props.highlight(props.app.Make)}</td>
            <td>{props.highlight(props.app.Model)}</td>
            <td>{props.highlight(props.app.ModelYear.toString())}</td>
            <td>{props.highlight(props.app.CreationDate.toString())}</td>
            <td>{props.app.StartDate && props.highlight(props.app.StartDate.toString())}</td>
            <td>{props.app.EndDate && props.highlight(props.app.EndDate.toString())}</td>
            <td>{props.highlight(props.app.Cost)}</td>
            <td>{props.highlight(props.app.VIN)}</td>
            <td>{props.app.Mileage && props.highlight(props.app.Mileage.toString())}</td>
            <td>{props.highlight(props.app.LicensePlate)}</td>
            <td>{props.highlight(props.app.Status)}</td>
            <td onClick={async () => await props.deleteAppointment([props.app.AppointmentID])}>Delete</td>
        </React.Fragment>
    )
}