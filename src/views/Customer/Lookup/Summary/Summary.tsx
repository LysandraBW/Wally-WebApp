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

interface SummaryProps {
    info: DB_AppointmentSummary;
}

export default function Summary(props: SummaryProps) {
    const [tab, setTab] = useState('General');
    const tabs = ['General', 'Vehicle', 'Services', 'Diagnoses', 'Repairs', 'Notes'];

    return (
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
                                appointment={props.info}
                            />
                        }
                        {tab === 'Vehicle' &&
                            <Vehicle
                                appointment={props.info}
                            />
                        }
                        {tab === 'Services' &&
                            <Service
                                appointment={props.info}
                            />
                        }
                        {tab === 'Diagnoses' &&
                            <Diagnoses
                                appointment={props.info}
                            />
                        }
                        {tab === 'Repairs' &&
                            <Repairs
                                appointment={props.info}
                            />
                        }
                        {tab === 'Notes' &&
                            <Notes
                                appointment={props.info}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}