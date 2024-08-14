import { GetAppointment } from "@/database/Export";
import { goToUpdateApt } from "@/lib/Navigation/Navigation";
import { useContext, useEffect, useState } from "react";
import { toDisplayDateTime } from "@/lib/Convert/Convert";
import { DB_Appointment } from "@/database/Types";
import { useRouter } from 'next/navigation';
import Note from "./Note";
import { PageContext } from "@/process/Employee/Home/Context";
import CloseButton from "@/components/Button/Icon/Close";

interface AppointmentProps {
    appointmentID: string;
    onClose: () => any;
}

export default function Appointment(props: AppointmentProps) {
    const router = useRouter();
    const context = useContext(PageContext);
    const [appointment, setAppointment] = useState<DB_Appointment>();

    useEffect(() => {
        const load = async () => {   
            if (!props.appointmentID) {
                router.replace(`/Employee/Dashboard/Dashboard`);
                return;
            }

            const appointment = await GetAppointment({
                SessionID: context.Employee.SessionID, 
                AppointmentID: props.appointmentID
            });
            if (!appointment)
                throw 'Appointment Error';

            router.replace(`/Employee/Dashboard/Dashboard?AptID=${props.appointmentID}`);
            setAppointment(appointment);
        }
        load();
    }, [props.appointmentID]);

    return (
        <div>
            {appointment && 
                <div>
                    <CloseButton
                        onClick={() => {
                            props.onClose();
                            router.replace(`/Employee/Dashboard/Dashboard`);
                        }}
                    />
                    <div>
                        <div>{appointment.FName} {appointment.LName}</div>
                        <div>{appointment.ModelYear} {appointment.Make} {appointment.Model}</div>
                        <div>{toDisplayDateTime(appointment.CreationDate)}</div>
                        <div>{toDisplayDateTime(appointment.UpdationDate)}</div>
                        <div>{toDisplayDateTime(appointment.StartDate)}</div>
                        <div>{toDisplayDateTime(appointment.EndDate)}</div>
                        <div>{appointment.Cost}</div>
                        <div>{appointment.VIN}</div>
                        <div>{appointment.Mileage}</div>
                        <div>{appointment.LicensePlate}</div>
                        <div>{appointment.Status}</div>
                        {appointment &&
                            <div>
                                {appointment.Notes.map((note, i) => (
                                    <div key={i}>
                                        <Note
                                            note={note}
                                        />
                                    </div>
                                ))}
                            </div>
                        }
                        <button 
                            onClick={async () => {
                                await goToUpdateApt(appointment.AppointmentID);
                            }}
                        >
                            Update Appointment
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}