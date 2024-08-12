import { toDisplayDateTime, toFloat, toString } from "@/lib/Convert/Convert";
import { DB_AppointmentSummary } from "@/database/Types";
import { useState } from "react";
import clsx from "clsx";
import General from "./General";
import Vehicle from "./Vehicle";
import Service from "./Service";
import Diagnoses from "./Diagnoses";
import Repairs from "./Repairs";
import Notes from "./Notes";

interface AppointmentProps {
    data: DB_AppointmentSummary;
}

export default function Appointment(props: AppointmentProps) {
    const [tab, setTab] = useState('General');
    const tabs = ['General', 'Vehicle', 'Services', 'Diagnoses', 'Repairs', 'Notes'];

    return (
        <div className='absolute top-0 left-0 w-screen h-screen bg-[#00000020] backdrop-blur-3xl z-10'>
            <div className='h-full flex justify-center items-center py-8'>
                <div 
                    className={clsx(
                        'rounded-[0.375rem]',
                        'bg-white shadow-xl border border-gray-300'
                    )}
                >
                    <header className='px-8 py-6 border-b border-b-gray-300'>
                        <h1 className='font-medium text-base'>Appointment Overview</h1>
                    </header>
                    <div 
                        className={clsx(
                            'flex items-center h-12 gap-x-8 px-8', 
                            'border-b border-b-gray-300',
                            'shadow'
                        )}
                    >
                        {tabs.map((t, i) => (
                            <span
                                key={i}
                                onClick={() => setTab(t)}
                                className={clsx(
                                    'flex items-center',
                                    'relative h-full text-sm text-gray-400',
                                    tab === t && '!text-black font-medium tracking-tight',
                                    tab === t && 'after:block after:h-[3px] after:w-full after:bg-black after:absolute after:bottom-0'
                                )}
                            >{t}</span>
                        ))}
                    </div>
                    <div className='pt-4 pb-6 px-8'>
                        <div className='flex flex-col gap-y-4'>
                            {tab === 'General' &&
                                <General
                                    appointment={props.data}
                                />
                            }
                            {tab === 'Vehicle' &&
                                <Vehicle
                                    appointment={props.data}
                                />
                            }
                            {tab === 'Services' &&
                                <Service
                                    appointment={props.data}
                                />
                            }
                            {tab === 'Diagnoses' &&
                                <Diagnoses
                                    appointment={props.data}
                                />
                            }
                            {tab === 'Repairs' &&
                                <Repairs
                                    appointment={props.data}
                                />
                            }
                            {tab === 'Notes' &&
                                <Notes
                                    appointment={props.data}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}