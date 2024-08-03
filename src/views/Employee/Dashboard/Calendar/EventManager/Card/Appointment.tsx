import { goToApt, goToUpdateApt } from "@/lib/Navigation/Navigation";

interface AppointmentCardProps {
    name: string;
    date: string;
    summary: string;
    appointmentID: string;
}

export default function AppointmentCard(props: AppointmentCardProps) {
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.date}</p>
            <p>{props.summary}</p>
            <button onClick={() => goToApt(props.appointmentID)}>View Appointment</button>
            <button onClick={() => goToUpdateApt(props.appointmentID)}>Update Appointment</button>
        </div>
    )
}