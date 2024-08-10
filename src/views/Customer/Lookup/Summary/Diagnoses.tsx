import { DB_AppointmentSummary } from "@/database/Types"
import { Fragment } from "react";

interface DiagnosesProps {
    appointment: DB_AppointmentSummary;
}

export default function Diagnoses(props: DiagnosesProps) {
    return (
        <Fragment>
            {!!props.appointment.Diagnoses.length &&
                <div className='flex flex-col gap-y-2'>
                    <h5 className='font-medium'>All Diagnoses</h5>
                    <div className='flex flex-col gap-y-3'>
                        {props.appointment.Diagnoses.map((diagnosis, i) => (
                            <div key={i} className='p-2 border border-gray-300 rounded'>
                                <h6 className='text-sm font-medium'>{diagnosis.Message}</h6>
                                <span className='text-xs text-gray-400'>Code {diagnosis.Code}</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {!props.appointment.Diagnoses.length &&
                <div>
                    <p className='text-gray-400'>There are no current diagnoses. Make sure to check back later.</p>
                </div>
            }
        </Fragment>
    )
}