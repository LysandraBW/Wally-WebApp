import { Fragment } from "react";
import AppointmentDisplayData from "./AppointmentDisplayData";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";

interface VehicleTabProps {
    appointment: DB_ProtectedAppointment;
}

export default function VehicleTab(props: VehicleTabProps) {
    return (
        <Fragment>
            <AppointmentDisplayData
                label="Vehicle"
                value={`${props.appointment.ModelYear} ${props.appointment.Make} ${props.appointment.Model}`}
            />
            <AppointmentDisplayData
                label="VIN"
                value={`${props.appointment.VIN || "None Listed"}`}
            />
            <AppointmentDisplayData
                label="License Plate"
                value={`${props.appointment.LicensePlate || "None Listed"}`}
            />
            <AppointmentDisplayData
                label="Mileage"
                value={`${props.appointment.Mileage || "None Listed"}`}
                lastRow={true}
            />
        </Fragment>
    )
}