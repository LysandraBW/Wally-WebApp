import { getSessionID } from "@/lib/Authorize/Authorize";
import { QuickAppointment } from "@/lib/Database/Appointment/Appointment";
import { UpdateLabel } from "@/lib/Database/Export";
import { useState, useEffect } from "react";
import { Label } from "@/lib/Database/Info/Info";
import React from "react";

interface AppointmentProps {
    app: QuickAppointment;
    labelMeta: {[k: string]: Label};
    labels: {[k: string]: number};
    updateLabel: (appID: string, labelName: string) => any;
    highlight: (entry: string) => React.ReactNode;
    checked: boolean;
    checkAppointment: (appID: string) => void;
    deleteAppointment: (appIDs: Array<string>) => void;
}

export default function Appointment(props: AppointmentProps) {
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
                    checked={!!props.labels.Star && !!props.labels.Star}
                />
            </td>
            <td>
                <input 
                    type='checkbox'
                    onChange={() => labelHandler('Flag')}
                    checked={!!props.labels.Flag && !!props.labels.Flag}
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
            <td
                onClick={async () => {
                    await props.deleteAppointment([props.app.AppointmentID]);
                }}
            >
                Delete
            </td>
        </React.Fragment>
    )
}