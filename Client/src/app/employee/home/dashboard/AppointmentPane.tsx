import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { Fragment, useEffect, useState } from "react";
import CloseButton from "@/component/Button/CloseButton";
import { toDisplayDate } from "@/utils/convert";
import clsx from "clsx";
import { Appointment as DB_Appointment } from "waltronics-types";
import { navigate } from "@/utils/navigate";
import { PAGE_EDIT_APPOINTMENT, PAGE_VIEW_APPOINTMENT } from '@/utils/constants';
import { AnimatePresence, motion } from "motion/react";
import Card from "@/component/IconV2/Card";
import Date from "@/component/IconV2/Date";
import { AppointmentManager } from "./managers/useAppointmentManager";

interface AppointmentPaneProps {
    appointmentManager: AppointmentManager;
}

// It's not standard practice to include
// multiple components in one file. But,
// this component is not used anywhere else.
// And I don't want to make another file for
// a component this small in scope.
function DataGroup({head, data}: {
    head: string;
    data: Array<[React.ReactNode, React.ReactNode]>
}) {
    return (
        <div className="flex flex-col gap-x-2 gap-y-1 p-4 py-2 border-b border-gray-300 last:!border-b-0 hover:bg-gray-50">
            <span className="font-medium text-gray-700 text-03 tracking-wide">{head}</span>
            <div className="grid grid-cols-[30%_70%] gap-x-4">
                {data.map(([key, value], i) => (
                    <Fragment key={i}>
                        <span className="text-gray-400 tracking-wide text-02">{key}</span>
                        <span className="text-gray-700 tracking-wide text-02">{value}</span>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default function AppointmentPane(props: AppointmentPaneProps) {
    const [appointment, setAppointment] = useState<DB_Appointment>();
    const [amountPaid, setAmountPaid] = useState<string>("None");

    
    useEffect(() => {
        console.log(props.appointmentManager.openedAppointment);
        const load = async () => {
            const appointment: DB_Appointment = await SelectAppointment({appointmentID: props.appointmentManager.openedAppointment});
            setAppointment(appointment);
        };
        load(); 
    }, [props.appointmentManager.openedAppointment]);


    useEffect(() => {
        calculateData();
    }, [appointment]);


    const calculateData = () => {
        if (!appointment)
            return;

        let amountPaid = 0;
        for (const p of appointment.Payments)
            amountPaid += p.Payment;
        if (amountPaid !== 0)
            setAmountPaid("$" + amountPaid);
        else
            setAmountPaid("None");
    }


    return (
        <motion.div
            className="flex flex-col justify-between w-[550px] h-screen max-h-screen overflow-y-scroll scroll-hide bg-white border-l border-gray-300 shadow-2xl fixed top-0 right-0"
            initial={{right: "-500px"}}
            animate={{right: "0px"}}
            exit={{right: "-500px"}}
            key="OpenedAppointment"
        >
            {/* Close Button */}
            <div className="flex justify-between px-4 py-3 border-b border-gray-300">
                <CloseButton close={props.appointmentManager.closeAppointment}/>
                <div className="flex gap-2">
                    <div className="bg-gray-100 rounded p-0.5 px-1 cursor-pointer hover:bg-gray-200 flex items-center justify-center" onClick={props.appointmentManager.goToPrevAppointment}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="cursor-pointer size-3.5 stroke-gray-400">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                    <div className="bg-gray-100 rounded p-0.5 px-1 cursor-pointer hover:bg-gray-200 flex items-center justify-center" onClick={props.appointmentManager.goToNextAppointment}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="cursor-pointer size-3.5 stroke-gray-400">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </div>
                </div>
            </div>
            {appointment &&
                <div>
                    <div className="px-4 py-4 flex flex-col items-center border-b border-gray-300 bg-gray-100">
                        {/* Appointment ID */}
                        {/* <div className="!w-min flex items-center gap-1 fill-gray-400">
                            <Card
                                style="size-4 stroke-gray-400"
                            />
                            <span className="w-min text-01 text-gray-400 whitespace-nowrap tracking-wider">
                                {appointment.AppointmentID}
                            </span>
                        </div> */}
                        {/* Creation Date */}
                        {/* <div className="!w-min flex items-center gap-1 fill-gray-400">
                            <Date
                                style="size-4 stroke-gray-400"
                            />
                            <span className="w-min text-01 text-gray-400 whitespace-nowrap tracking-wider">
                                Created on {toDisplayDate(appointment.CreationDate).slice(0, 10)}
                            </span>
                        </div> */}
                        {/* Full Name */}
                        <h6 className="text-gray-950 font-medium text-3xl text-center">
                            {appointment.FName} {appointment.LName}
                        </h6>
                    </div>
                    <div 
                        className={clsx(
                            "",
                            "h-10",
                            "bg-transparent border-b border-gray-300 p-1"
                        )}
                    >
                        <div className="bg-gray-50 w-full h-full rounded-md border border-gray-300 flex gap-1 p-0.5">
                            <button
                                onClick={() => navigate(PAGE_VIEW_APPOINTMENT, {appointmentID: props.appointmentManager.openedAppointment || ""})}
                                className="w-full rounded bg-white border border-gray-300 shadow-sm text-gray-400 text-02 font-medium tracking-wide hover:bg-gray-50 hover:text-blue-500"
                            >
                                View
                            </button>
                            <button
                                onClick={() => navigate(PAGE_EDIT_APPOINTMENT, {appointmentID: props.appointmentManager.openedAppointment || ""})}
                                className="w-full rounded bg-white border border-gray-300 shadow-sm text-gray-400 text-02 font-medium tracking-wide hover:bg-gray-50 hover:text-blue-500"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-[30%_70%] gap-x-4 p-4 py-2 border-b border-b-gray-300 hover:bg-gray-50">
                        <span className="font-medium text-gray-700 text-03 tracking-wide">Date Created</span>
                        <span className="text-gray-700 tracking-wide text-02">{toDisplayDate(appointment.CreationDate, "MMMM Do, YYYY [at] h:mm A")}</span>
                    </div>
                    <div className="grid grid-cols-[30%_70%] gap-x-4 p-4 py-2 border-b border-b-gray-300 hover:bg-gray-50">
                        <span className="block font-medium text-gray-700 text-03 tracking-wide">Appointment ID</span>
                        <span className="block text-gray-700 tracking-wide text-02">{appointment.AppointmentID}</span>
                    </div>
                    {/* Buttons for Ease-of-Access */}
                    
                    <DataGroup
                        head="Contact"
                        data={[
                            ["Full Name", appointment.FName + " " + appointment.LName],
                            ["Email Address", appointment.Email],
                            ["Phone Number", appointment.Phone]
                        ]}
                    />
                    <DataGroup
                        head="Date"
                        data={[
                            ["Status", appointment.Status],
                            ["Start Date", toDisplayDate(appointment.StartDate) || "N/A"],
                            ["End Date", toDisplayDate(appointment.EndDate) || "N/A"]
                        ]}
                    />
                    <DataGroup
                        head="Vehicle"
                        data={[
                            ["VIN", appointment.VIN || "N/A"],
                            ["Model Year", appointment.ModelYear],
                            ["Make", appointment.Make],
                            ["Model", appointment.Model]
                        ]}
                    />
                    <DataGroup
                        head="Services"
                        data={[
                            ["Number of Services", appointment.Services.length],
                            ["Services", 
                                <>
                                    {appointment.Services.length > 0 &&
                                        <ul>
                                            {appointment.Services.map((service, i) => (
                                                <li key={i} className="flex gap-1 items-center">
                                                    {appointment.Services.length > 1 &&
                                                        <span className="bg-gray-700 rounded-full w-1 h-1"/>
                                                    }
                                                    <span className="text-gray-700 font-medium tracking-wide">
                                                        {service.Service}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                    {appointment.Services.length === 0 && "N/A"}
                                </>
                            ]
                        ]}
                    />
                    <DataGroup
                        head="Payments"
                        data={[
                            ["Cost", appointment.Cost !== null ? `$${appointment.Cost}` : "N/A"],
                            ["Amount Paid", amountPaid]
                        ]}
                    />
                </div>
            }
        </motion.div>
        
    )
}