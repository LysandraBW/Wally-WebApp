import { GetAppointment } from "@/database/Export";
import { goToUpdateApt } from "@/lib/Navigation/Redirect";
import { useContext, useEffect, useState } from "react";
import { DefaultPageContext } from "@/app/Employee/Dashboard/Dashboard/page";
import { toString } from "@/lib/Convert/Convert";
import { DB_Appointment } from "@/database/Types";
import { useRouter } from 'next/navigation';
import Note from "./Note";

interface OverviewProps {
    aptID: string;
    onClose: () => any;
}

export default function Overview(props: OverviewProps) {
    const context = useContext(DefaultPageContext);
    const [appointment, setAppointment] = useState<DB_Appointment>();
    const { replace } = useRouter();

    useEffect(() => {
        const load = async () => {   
            if (!props.aptID) {
                replace(`/Employee/Dashboard/Dashboard`);
                return;
            }

            const appointment = await GetAppointment({
                SessionID: context.Employee.SessionID,
                AppointmentID: props.aptID
            });

            if (!appointment)
                throw 'Appointment Error';

            replace(`/Employee/Dashboard/Dashboard?AptID=${props.aptID}`);
            setAppointment(appointment);
        }
        load();
    }, [props.aptID]);

    return (
        <div>
            {appointment && 
                <div>
                    <div 
                        onClick={() => {
                            props.onClose();
                            replace(`/Employee/Dashboard/Dashboard`);
                        }}
                    >
                        x
                    </div>
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