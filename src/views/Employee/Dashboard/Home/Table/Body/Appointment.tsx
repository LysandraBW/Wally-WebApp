import React from "react";
import { toString } from "@/lib/Convert/Convert";
import { DB_AppointmentLabels, DB_AppointmentOverview } from "@/database/Types";

interface AppointmentProps {
    appointment: DB_AppointmentOverview;
    appointmentLabels: DB_AppointmentLabels;
    updateLabel: (appointmentID: string, labelName: string) => any;
    isChecked: boolean;
    checkAppointment: (appointmentID: string) => void;
    deleteAppointment: (appointmentIDs: Array<string>) => void;
    search: string;
}

export default function Appointment(props: AppointmentProps) {
    const updateLabel = async (labelName: string) => {
        props.updateLabel(props.appointment.AppointmentID, labelName);
    }

    const highlightEntry = (entry: string): React.ReactNode => {
        if (!entry || !props.search)
            return entry;

        const upperCasedEntry = entry.toUpperCase();
        const upperCasedSearch = props.search.toUpperCase();

        if (!upperCasedEntry.includes(upperCasedSearch))
            return entry;

        const index = upperCasedEntry.indexOf(upperCasedSearch);
        
        const lString = entry.substring(0, index);
        const mString = entry.substring(index, index + props.search.length);
        const rString = entry.substring(index + props.search.length);

        return (
            <span>
                {lString}<b>{mString}</b>{rString}
            </span>
        )
    }
    
    return (
        <React.Fragment>
            <td>
                <input 
                    type='checkbox' 
                    onChange={() => props.checkAppointment(props.appointment.AppointmentID)}
                    checked={props.isChecked}
                    onClick={(event) => event.stopPropagation()}
                />
            </td>
            <td>
                <input 
                    type='checkbox'
                    onChange={() => updateLabel('Star')}
                    checked={!!props.appointmentLabels.Star.Value}
                    onClick={(event) => event.stopPropagation()}
                />
            </td>
            <td>
                <input 
                    type='checkbox'
                    onChange={() => updateLabel('Flag')}
                    checked={!!props.appointmentLabels.Flag.Value}
                    onClick={(event) => event.stopPropagation()}
                />
            </td>
            <td>{highlightEntry(props.appointment.FName)}</td>
            <td>{highlightEntry(props.appointment.LName)}</td>
            <td>{highlightEntry(props.appointment.Make)}</td>
            <td>{highlightEntry(props.appointment.Model)}</td>
            <td>{highlightEntry(toString(props.appointment.ModelYear))}</td>
            <td>{highlightEntry(toString(props.appointment.CreationDate))}</td>
            <td>{highlightEntry(toString(props.appointment.StartDate))}</td>
            <td>{highlightEntry(toString(props.appointment.EndDate))}</td>
            <td>{highlightEntry(toString(props.appointment.Cost))}</td>
            <td>{highlightEntry(props.appointment.VIN)}</td>
            <td>{highlightEntry(toString(props.appointment.Mileage))}</td>
            <td>{highlightEntry(props.appointment.LicensePlate)}</td>
            <td>{highlightEntry(props.appointment.Status)}</td>
            <td 
                onClick={async () => {
                    await props.deleteAppointment([props.appointment.AppointmentID]);
                }}
            >
                Delete
            </td>
        </React.Fragment>
    )
}