import { DB_AppointmentSummary } from "@/database/Types"
import { Fragment } from "react";

interface DiagnosesProps {
    appointment: DB_AppointmentSummary;
}

export default function Repairs(props: DiagnosesProps) {
    return (
        <Fragment>
            {!!props.appointment.Repairs.length &&
                <div className='flex flex-col gap-y-2'>
                    <h5 className='font-medium'>All Repairs</h5>
                    <div className='flex flex-col gap-y-3'>
                        {props.appointment.Repairs.map((repair, i) => (
                            <div key={i} className='p-2 border border-gray-300 rounded'>
                                <h6 className='text-sm font-medium'>{repair.Repair}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {!props.appointment.Repairs.length &&
                <div>
                    <p className='text-gray-400'>There are no current repairs. Make sure to check back later.</p>
                </div>
            }
        </Fragment>
    )
}