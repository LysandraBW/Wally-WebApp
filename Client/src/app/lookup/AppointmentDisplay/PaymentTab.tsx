import { Fragment } from "react";
import AppointmentDisplayData from "./AppointmentDisplayData";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";

interface PaymentTabProps {
    appointment: DB_ProtectedAppointment;
}

export default function PaymentTab(props: PaymentTabProps) {
    return (
        <Fragment>
            <AppointmentDisplayData
                label="Cost"
                value={`${props.appointment.Cost ? `$${props.appointment.Cost}` : "TBA"}`}
                lastRow={true}
            />
        </Fragment>
    )
}