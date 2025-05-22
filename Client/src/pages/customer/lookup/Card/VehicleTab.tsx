import { Fragment } from "react";
import CardData from "./CardData";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";

interface VehicleTabProps {
    appointment: DB_ProtectedAppointment;
}

export default function VehicleTab(props: VehicleTabProps) {
    return (
        <Fragment>
            <CardData
                label="Vehicle"
                value={`${props.appointment.ModelYear} ${props.appointment.Make} ${props.appointment.Model}`}
            />
            <CardData
                label="VIN"
                value={`${props.appointment.VIN || "None Listed"}`}
            />
            <CardData
                label="License Plate"
                value={`${props.appointment.LicensePlate || "None Listed"}`}
            />
            <CardData
                label="Mileage"
                value={`${props.appointment.Mileage || "None Listed"}`}
                lastRow={true}
            />
        </Fragment>
    )
}