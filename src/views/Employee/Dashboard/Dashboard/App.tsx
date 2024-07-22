import { FullAppointment } from "@/lib/Database/Appointment/Appointment";
import { Remove, UpdateLabel } from "@/lib/Database/Export";
import { useEffect, useState } from "react";

interface AppProps {
    employeeID: number;
    appointment: [FullAppointment];
    forceReload: () => any;
    checkAppointment: (appointmentID: number) => any;
    checked: boolean;
}

export default function App(props: AppProps) {
    const [star, setStar] = useState<boolean>(!!props.appointment[0].Star);
    const [flag, setFlag] = useState<boolean>(!!props.appointment[0].Flag);

    return (
        <div
            onClick={() => {

            }}
        >
            <span
                onClick={async () => {
                    const output = await Remove({
                        EmployeeID: props.employeeID,
                        AppointmentID: props.appointment[0].AppointmentID
                    });
                    output && await props.forceReload();
                }}
            >
                DELETE
            </span>
            <span>
                <input
                    type='checkbox' 
                    checked={props.checked}
                    onChange={() => {
                        props.checkAppointment(props.appointment[0].AppointmentID);
                    }}
                />
            </span>
            <span 
                onClick={async () => {
                    const output = await UpdateLabel({
                        EmployeeID: props.employeeID,
                        AppointmentID: props.appointment[0].AppointmentID,
                        Label: 'STAR'
                    });
                    output && setStar(!star);
                }}
            >
                {star ? 'STAR' : 'star'}
            </span>
            <span 
                onClick={async () => {
                    const output = await UpdateLabel({
                        EmployeeID: props.employeeID,
                        AppointmentID: props.appointment[0].AppointmentID,
                        Label: 'FLAG'
                    });
                    output && setFlag(!flag);
                }}
            >
                {flag ? 'FLAG' : 'flag'}
            </span>
            <span>{props.appointment[0].CreationDate?.toString() || '' }</span>
            <span>{props.appointment[0].Status || '' }</span>
            <span>{props.appointment[0].FName || '' }</span>
            <span>{props.appointment[0].LName || '' }</span>
            <span>{props.appointment[0].ModelYear} {props.appointment[0].Make} {props.appointment[0].Model || '' }</span>
            <span>{props.appointment[0].VIN || '' }</span>
            <span>{props.appointment[0].StartDate?.toString() || '' }</span>
            <span>{props.appointment[0].EndDate?.toString() || '' }</span>
            <span>{props.appointment[0].Cost || '' }</span>
        </div>
    )
}