import { DB_AppointmentSummary } from "@/database/Types"
import { toDisplayDateTime, toWebDateTime } from "@/lib/Convert/Convert";
import { Fragment } from "react";

interface GeneralProps {
    appointment: DB_AppointmentSummary;
}

export default function General(props: GeneralProps) {
    return (
        <Fragment>
            <div className='flex flex-col gap-y-1'>
                <h5 className='font-medium'>Contact</h5>
                <span className='text-gray-400 text-sm font-medium'>{props.appointment.FName} {props.appointment.LName}</span>
                <p className='text-gray-400'>{props.appointment.Email}</p>
                <p className='text-gray-400'>{props.appointment.Phone}</p>
            </div>
            <div>
                <h5 className='font-medium'>Status</h5>
                <span className='text-gray-400 text-sm font-medium'>{props.appointment.Status}</span>
                {!!props.appointment.StartDate &&
                    <p className='text-gray-400'>The vehicle can be dropped off on {toDisplayDateTime(props.appointment.StartDate)}</p>
                }
                {!props.appointment.StartDate &&
                    <p className='text-gray-400'>The date at which the vehicle should be dropped off has not been specified.</p>
                }
                {!!props.appointment.EndDate &&
                    <p className='text-gray-400'>The vehicle will be ready on {toDisplayDateTime(props.appointment.EndDate)} for pick-up.</p>
                }
                {!props.appointment.EndDate &&
                    <p className='text-gray-400'>The date at which the vehicle should be picked up has not been specified..</p>
                }
            </div>
            <div>
                <h5 className='font-medium'>Estimated Cost</h5>
                <span className='text-gray-400 text-sm font-medium block w-[300px]'>Due by the End Date</span>
                <p className='text-gray-400'>${props.appointment.Cost.toFixed(2)}</p>
            </div>
        </Fragment>
    )
}