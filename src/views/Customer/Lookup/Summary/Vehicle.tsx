import { DB_AppointmentSummary } from "@/database/Types"
import { Fragment } from "react";

interface VehicleProps {
    appointment: DB_AppointmentSummary;
}

export default function Vehicle(props: VehicleProps) {
    return (
        <Fragment>
            <div>
                <h5 className='font-medium'>Vehicle</h5>
                <span className='text-gray-400 text-sm font-medium'>{props.appointment.VIN}</span>
                <p className='text-gray-400'>{props.appointment.ModelYear} {props.appointment.Make} {props.appointment.Model}</p>
            </div>
            <div>
                <h5 className='font-medium'>Mileage</h5>
                <p className='text-gray-400'>{props.appointment.Mileage} Miles</p>
            </div>
            <div>
                <h5 className='font-medium'>License Plate</h5>
                <p className='text-gray-400'>{props.appointment.LicensePlate}</p>
            </div>
        </Fragment>
    )
}