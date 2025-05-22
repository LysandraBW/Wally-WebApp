import { Fragment } from "react";
import CardData from "./CardData";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";

interface PaymentTabProps {
    appointment: DB_ProtectedAppointment;
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