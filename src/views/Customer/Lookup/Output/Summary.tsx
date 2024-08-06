import { toDisplayDateTime, toFloat, toString } from "@/lib/Convert/Convert";
import { DB_AppointmentSummary } from "@/database/Types";
import { useState } from "react";
import Person from "@/components/Icon/Person/Person";
import Truck from "@/components/Icon/Truck/Truck";
import Nut from "@/components/Icon/Nut/Nut";
import FileText from "@/components/Icon/FileText/FileText";
import Dash from "@/components/Icon/Dash/Dash";
import Clipboard from "@/components/Icon/Clipboard/Clipboard";

interface AppointmentSummaryProps {
    info: DB_AppointmentSummary;
}

export default function AppointmentSummary(props: AppointmentSummaryProps) {
    const [tab, setTab] = useState('General');

    return (
        <div className='h-[85%] w-[85%] shadow-xl overflow-y-scroll px-[32px] py-[64px] rounded flex flex-col gap-y-[16px]'>
            <div>
                <h3 className='font-semibold text-[32px]'>Hello, {props.info.FName}</h3>
                <p>Your appointment's information is shown below.</p>
            </div>
            <div className={'flex gap-x-[16px] border-b border-b-black'}>
                <div 
                    onClick={() => setTab('General')}  
                    className={[
                        'flex relative justify-center items-center gap-x-[4px] p-[4px]',
                        `${tab === 'General' ? 'after:block after:absolute after:w-full after:h-[3px] after:bottom-0 after:bg-black after:rounded-[1px]' : ''}`
                    ].join(' ')}
                >
                    <Person/>
                    <span className='font-medium'>General</span>
                </div>
                <div 
                    onClick={() => setTab('Vehicle')}  
                    className={[
                        'flex relative justify-center items-center gap-x-[4px] p-[4px]',
                        `${tab === 'Vehicle' ? 'after:block after:absolute after:w-full after:h-[3px] after:bottom-0 after:bg-black after:rounded-[1px]' : ''}`
                    ].join(' ')}
                >
                    <Truck/>
                    <span className='font-medium'>Vehicle</span>
                </div>
                <div 
                    onClick={() => setTab('Servicing')}  
                    className={[
                        'flex relative justify-center items-center gap-x-[4px] p-[4px]',
                        `${tab === 'Servicing' ? 'after:block after:absolute after:w-full after:h-[3px] after:bottom-0 after:bg-black after:rounded-[1px]' : ''}`
                    ].join(' ')}
                >
                    <Clipboard/>
                    <span className='font-medium'>Servicing</span>
                </div>
                <div 
                    onClick={() => setTab('Notes')}  
                    className={[
                        'flex relative justify-center items-center gap-x-[4px] p-[4px]',
                        `${tab === 'Notes' ? 'after:block after:absolute after:w-full after:h-[3px] after:bottom-0 after:bg-black after:rounded-[1px]' : ''}`
                    ].join(' ')}
                >
                    <FileText/>
                    <span className='font-medium'>Notes</span>
                </div>
            </div>
            {tab === 'General' && 
                <div className='flex flex-col gap-y-[16px]'>
                    <h4 className='font-medium text-[20px]'>General Information</h4>
                    <table className='border border-collapse'>
                        <tr className='border border-collapse'>
                            <th className='border border-collapse text-left font-medium p-[4px]'>Appointment ID</th>
                            <td className='border border-collapse p-[4px]'>{props.info.AppointmentID}</td>
                        </tr>
                        <tr className='border border-collapse'>
                            <th className='border border-collapse text-left font-medium p-[4px]'>Customer ID</th>
                            <td className='border border-collapse p-[4px]'>{props.info.CustomerID}</td>
                        </tr>
                        <tr className='border border-collapse text-left p-[4px]'>
                            <th className='border border-collapse font-medium p-[4px]'>Name</th>
                            <td className='border border-collapse p-[4px]'>{props.info.FName} {props.info.LName}</td>
                        </tr>
                        <tr className='border border-collapse text-left p-[4px]'>
                            <th className='border border-collapse font-medium p-[4px]'>Email</th>
                            <td className='border border-collapse p-[4px]'>{props.info.Email}</td>
                        </tr>
                        <tr className='border border-collapse text-left p-[4px]'>
                            <th className='border border-collapse font-medium p-[4px]'>Phone</th>
                            <td className='border border-collapse p-[4px]'>{props.info.Phone}</td>
                        </tr>
                        <tr className='border border-collapse text-left p-[4px]'>
                            <th className='border border-collapse font-medium p-[4px]'>Status</th>
                            <td className='border border-collapse p-[4px]'>{props.info.Status}</td>
                        </tr>
                        <tr className='border border-collapse text-left p-[4px]'>
                            <th className='border border-collapse font-medium p-[4px]'>Start Date</th>
                            <td className='border border-collapse p-[4px]'>{toDisplayDateTime(props.info.StartDate)}</td>
                        </tr>
                        <tr className='border border-collapse text-left p-[4px]'>
                            <th className='border border-collapse font-medium p-[4px]'>End Date</th>
                            <td className='border border-collapse p-[4px]'>{toDisplayDateTime(props.info.EndDate)}</td>
                        </tr>
                        <tr className='border border-collapse text-left p-[4px]'>
                            <th className='border border-collapse font-medium p-[4px]'>Cost</th>
                            <td className='border border-collapse p-[4px]'>${toFloat(props.info.Cost).toFixed(2)}</td>
                        </tr>
                    </table>
                </div>
            }
            {tab === 'Vehicle' && 
                <div className='flex flex-col gap-y-[16px]'>
                    <h4 className='font-medium text-[20px]'>Vehicle Information</h4>
                    <table>
                        <tr className='border border-collapse'>
                            <th className='border border-collapse text-left font-medium p-[4px]'>VIN</th>
                            <td className='border border-collapse p-[4px]'>{props.info.VIN}</td>
                        </tr>
                        <tr className='border border-collapse'>
                            <th className='border border-collapse text-left font-medium p-[4px]'>Model Year</th>
                            <td className='border border-collapse p-[4px]'>{props.info.ModelYear}</td>
                        </tr>
                        <tr className='border border-collapse'>
                            <th className='border border-collapse text-left font-medium p-[4px]'>Make</th>
                            <td className='border border-collapse p-[4px]'>{props.info.Make}</td>
                        </tr>
                        <tr className='border border-collapse'>
                            <th className='border border-collapse text-left font-medium p-[4px]'>Model</th>
                            <td className='border border-collapse p-[4px]'>{props.info.Model}</td>
                        </tr>
                        <tr className='border border-collapse'>
                            <th className='border border-collapse text-left font-medium p-[4px]'>License Plate</th>
                            <td className='border border-collapse p-[4px]'>{props.info.LicensePlate}</td>
                        </tr>
                        <tr className='border border-collapse'>
                            <th className='border border-collapse text-left font-medium p-[4px]'>Mileage</th>
                            <td className='border border-collapse p-[4px]'>{props.info.Mileage}</td>
                        </tr>
                    </table>
                </div>
            }
            {tab === 'Servicing' && 
                <div className='flex flex-col gap-y-[16px]'>
                    <div className='flex flex-col gap-y-[4px]'>
                        <h4 className='font-medium text-[20px]'>Services</h4>
                        {props.info.Services.map((Service, i) => (
                            <div 
                                key={i}
                                className='flex items-center gap-x-[4px]'    
                            >
                                <Dash/>
                                <span>{Service.Service}</span>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col gap-y-[4px]'>
                        <h4 className='font-medium text-[20px]'>Diagnoses</h4>
                        {props.info.Diagnoses.map((Diagnosis, i) => (
                            <div 
                                key={i}
                                className='flex items-center gap-x-[4px]'    
                            >
                            <Dash/>
                                {Diagnosis.Code} {Diagnosis.Message}
                            </div>
                        ))}
                        {!props.info.Diagnoses.length && 'As of now, there have been no logged diagnoses.'}
                    </div>
                    <div className='flex flex-col gap-y-[4px]'>
                        <h4 className='font-medium text-[20px]'>Repairs</h4>
                        {props.info.Repairs.map((Repair, i) => (
                            <div 
                                key={i}
                                className='flex items-center gap-x-[4px]'    
                            >
                                <Dash/>
                                {Repair.Repair}
                            </div>
                        ))}
                        {!props.info.Repairs.length && 'As of now, there have been no logged repairs.'}
                    </div>
                </div>
            }
            {tab === 'Notes' && 
                <div className='flex flex-col gap-y-[16px]'>
                    <div className='flex flex-col gap-y-[4px]'>
                        <h4 className='font-medium text-[20px]'>Notes</h4>
                        {props.info.Notes.map((Note, i) => (
                            <div key={i}>
                                {Note.Head}
                                {Note.Body}
                            </div>
                        ))}   
                        {!props.info.Notes.length && 'As of now, there have been no logged notes.'}                 
                    </div>
                </div>
            }
        </div>
    )
}