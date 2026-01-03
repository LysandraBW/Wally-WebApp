import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { Fragment, useEffect, useState } from "react";
import CloseButton from "@/component/Button/CloseButton";
import { toDisplayDate } from "@/utils/convert";
import clsx from "clsx";
import { Appointment as DB_Appointment } from "waltronics-types";
import { navigate } from "@/utils/navigate";
import { PAGE_EDIT_APPOINTMENT, PAGE_VIEW_APPOINTMENT } from '@/utils/constants';
import { motion } from "motion/react";
import { AppointmentManager } from "../managers/useAppointmentManager";
import ArrowLeft from "@/component/Icons/Icons/ArrowLeftIcon";
import ArrowRight from "@/component/Icons/Icons/ArrowRightIcon";
import SecondaryButton from "@/component/Button/SecondaryButton";
import PrimaryButton from "@/component/Button/PrimaryButton";
import IconButton from "@/component/Button/IconButton";
import ArrowLongLeftIcon from "@/component/Icons/Icons/ArrowLongLeftIcon";
import ArrowLongRightIcon from "@/component/Icons/Icons/ArrowLongRightIcon";
import ChevronRightIcon from "@/component/Icons/Icons/ChevonRightIcon";
import ChevronLeftIcon from "@/component/Icons/Icons/ChevronLeftIcon";
import UserIcon from "@/component/Icons/Icons/UserIcon";
import CalendarIcon from "@/component/Icons/Icons/CalendarIcon";
import DataGroup from "./DataGroup";

interface AppointmentPaneProps {
    appointmentManager: AppointmentManager;
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
            className="flex flex-col justify-between w-[550px] h-screen max-h-screen overflow-y-scroll scroll-hide bg-base-0 border-l border-base-300 dark:border-base-200 shadow-2xl fixed top-0 right-0"
            initial={{right: "-500px"}}
            animate={{right: "0px"}}
            exit={{right: "-500px"}}
            key="OpenedAppointment"
        >
            {/* Close Button */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-base-300 dark:border-base-200">
                <CloseButton 
                    size={12}
                    onClick={props.appointmentManager.closeAppointment}
                />
                <div className="flex gap-2">
                    <IconButton
                        onClick={props.appointmentManager.goToPrevAppointment}
                    >
                        <ChevronLeftIcon
                            className="stroke-[2.25px] stroke-base-500 size-3"
                        />
                    </IconButton>
                    <IconButton
                        onClick={props.appointmentManager.goToNextAppointment}
                    >
                        <ChevronRightIcon
                            className="stroke-[2.25px] stroke-base-500 size-3"
                        />
                    </IconButton>
                </div>
            </div>
            {appointment &&
                <div>
                    <div className="px-4 py-4 flex flex-col items-center border-b border-base-300 dark:border-base-200 bg-base-100 dark:bg-[#121214]">
                        <h6 className="text-base-900 font-medium text-2xl text-center">
                            {appointment.FName} {appointment.LName}
                        </h6>
                    </div>
                    <div className="border-b border-base-300 dark:border-base-200 p-1">
                        <div className="flex gap-2">
                            <SecondaryButton
                                className="text-sm text-center w-full flex justify-center items-center"
                                onClick={() => navigate(PAGE_VIEW_APPOINTMENT, {
                                    appointmentID: props.appointmentManager.openedAppointment || ""
                                })}
                            >
                                View
                            </SecondaryButton>
                            <PrimaryButton
                                className="text-sm text-center w-full flex justify-center items-center"
                                onClick={() => navigate(PAGE_EDIT_APPOINTMENT, {
                                    appointmentID: props.appointmentManager.openedAppointment || ""
                                })}
                            >
                                Update
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="grid grid-cols-[30%_70%] gap-x-4 p-4 py-2 border-b border-b-base-300 dark:border-base-200 hover:bg-base-50">
                        <span className="font-medium text-base-700 text-sm tracking-wide">Date Created</span>
                        <span className="text-base-700 tracking-wide text-sm">{toDisplayDate(appointment.CreationDate, "MMMM Do, YYYY [at] h:mm A")}</span>
                    </div>
                    <div className="grid grid-cols-[30%_70%] gap-x-4 p-4 py-2 border-b border-b-gray-300 dark:border-base-200 hover:bg-base-50">
                        <span className="block font-medium text-base-700 text-sm tracking-wide">Appointment ID</span>
                        <span className="block text-base-700 tracking-wide text-sm">{appointment.AppointmentID}</span>
                    </div>
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
                                                <li key={i} className="flex gap-2 items-center">
                                                    {appointment.Services.length > 1 &&
                                                        <span className="block bg-base-500 w-1 h-1"/>
                                                    }
                                                    <span className="block text-base-700 tracking-wide">
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