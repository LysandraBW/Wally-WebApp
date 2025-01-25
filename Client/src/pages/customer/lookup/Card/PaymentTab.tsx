import { Fragment } from "react";
import CardData from "./CardData";
import { DB_AppointmentSummary } from "@/services/DB/Interface/Appointment";
import { toDisplayDate } from "@/utils/format/toDisplayDate";

interface PaymentTabProps {
    appointment: DB_AppointmentSummary;
}

export default function PaymentTab(props: PaymentTabProps) {
    return (
        <Fragment>
            <CardData
                label="Cost"
                value={`${props.appointment.Cost ? `$${props.appointment.Cost}` : "TBA"}`}
                lastRow={true}
            />
        </Fragment>
    )
}