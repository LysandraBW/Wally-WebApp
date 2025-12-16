import { Fragment } from "react";
import AppointmentDisplayData from "./AppointmentDisplayData";
import { toDisplayDate } from "@/utils/convert";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";

interface ContactTabProps {
    appointment: DB_ProtectedAppointment;
}

export default function ContactTab(props: ContactTabProps) {
    return (
        <Fragment>
            <AppointmentDisplayData
                label="Full Name"
                value={`${props.appointment.FName} ${props.appointment.LName}`}
            />
            <AppointmentDisplayData
                label="Email Address"
                value={`${props.appointment.Email}`}
            />
            <AppointmentDisplayData
                label="Phone Number"
                value={`${props.appointment.Phone}`}
            />
            <AppointmentDisplayData
                label="Status"
                value={`${props.appointment.Status}`}
            />
            <AppointmentDisplayData
                label="Start Date"
                value={toDisplayDate(props.appointment.StartDate) || "None"}
            />
            <AppointmentDisplayData
                label="End Date"
                value={toDisplayDate(props.appointment.EndDate) || "None"}
                lastRow={true}
            />
        </Fragment>
    )
}