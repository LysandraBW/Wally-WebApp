import { GetAppointment } from "@/database/Export";
import { goToUpdateApt } from "@/lib/Navigation/Redirect";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "@/app/Employee/Dashboard/Dashboard/page";
import { toString } from "@/lib/Helper";
import { DB_Appointment } from "@/database/Types";
import { useSearchParams, useRouter } from 'next/navigation';
import Note from "./Note";

interface OverviewProps {
    appointmentID: string;
    onClose: () => any;
}

export default function Overview(props: OverviewProps) {
    const context = useContext(PageContext);
    const [appointment, setAppointment] = useState<DB_Appointment>();

    // For Maintaining Consistency Across Reloads
    const searchParameters = useSearchParams();
    const { replace } = useRouter();

    useEffect(() => {
        const load = async () => {
            // Load Appointment
            const appointment = await GetAppointment({
                SessionID: context.Employee.SessionID,
                AppointmentID: props.appointmentID
            });

            if (!appointment)
                throw 'Appointment Error';

            setAppointment(appointment);
        }
        load();
    }, []);

    useEffect(() => {
        if (!props.appointmentID)
            return;

        // Updating the Appointment ID Parameter for Reloading
        const parameters = new URLSearchParams(searchParameters);
        parameters.set('AptID', props.appointmentID);

        replace(`/Employee/Dashboard/Dashboard?${parameters.toString()}`);
    }, [props.appointmentID]);

    return (
        <div>
            {appointment && 
                <div>
                    <div onClick={() => props.onClose()}>x</div>
                    <div>
                        <div>{appointment.FName} {appointment.LName}</div>
                        <div>{appointment.ModelYear} {appointment.Make} {appointment.Model}</div>
                        <div>{toString(appointment.CreationDate)}</div>
                        <div>{toString(appointment.UpdationDate)}</div>
                        <div>{toString(appointment.StartDate)}</div>
                        <div>{toString(appointment.EndDate)}</div>
                        <div>{appointment.Cost}</div>
                        <div>{appointment.VIN}</div>
                        <div>{appointment.Mileage}</div>
                        <div>{appointment.LicensePlate}</div>
                        <div>{appointment.Status}</div>
                        <div>
                            {appointment && appointment.Notes.map((note, i) => (
                                <div key={i}>
                                    <Note
                                        note={note}
                                    />
                                </div>
                            ))}
                        </div>
                        <button onClick={async () => await goToUpdateApt(appointment.AppointmentID)}>Update Appointment</button>
                    </div>
                </div>
            }
        </div>
    )
}