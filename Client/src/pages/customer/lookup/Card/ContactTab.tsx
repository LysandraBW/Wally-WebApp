import { Fragment } from "react";
import CardData from "./CardData";
import { DB_AppointmentSummary } from "@/services/DB/Interface/Appointment";
import { toDisplayDate } from "@/utils/convert";

interface ContactTabProps {
    appointment: DB_AppointmentSummary;
}

export default function ContactTab(props: ContactTabProps) {
    return (
        <Fragment>
            <CardData
                label="Full Name"
                value={`${props.appointment.FName} ${props.appointment.LName}`}
            />
            <CardData
                label="Email Address"
                value={`${props.appointment.Email}`}
            />
            <CardData
                label="Phone Number"
                value={`${props.appointment.Phone}`}
            />
            <CardData
                label="Status"
                value={`${props.appointment.Status}`}
            />
            <CardData
                label="Start Date"
                value={toDisplayDate(props.appointment.StartDate) || "None"}
            />
            <CardData
                label="End Date"
                value={toDisplayDate(props.appointment.EndDate) || "None"}
                lastRow={true}
            />
        </Fragment>
    )
}