import { DB_AppointmentSummary } from "@/database/Types";
import { Fragment } from "react";

interface ServiceProps {
    appointment: DB_AppointmentSummary;
}

export default function Service(props: ServiceProps) {
    return (
        <Fragment>
            <div className='flex flex-col gap-y-2'>
                <h5 className='font-medium'>All Services</h5>
                <div className='flex flex-col gap-y-3'>
                    {props.appointment.Services.map((service, i) => (
                        <div key={i} className='p-2 border border-gray-300 rounded'>
                            <h6 className='text-sm font-medium'>{service.Service}</h6>
                            <span className='text-xs text-gray-400'>{service.Class}, {service.Division}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}