import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { Fragment, useEffect, useState } from "react";
import CloseButton from "@/component/Button/CloseButton";
import { toDisplayDate } from "@/utils/convert";
import clsx from "clsx";
import { Appointment as DB_Appointment } from "waltronics-types";
import { navigate } from "@/utils/navigate";
import { PAGE_EDIT_APPOINTMENT, PAGE_VIEW_APPOINTMENT } from '@/utils/constants';
import { AnimatePresence, motion } from "motion/react";

interface OpenedAppointmentProps {
    appointmentID: string;
    closeAppointment: () => void;
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
        <div className="flex flex-col gap-2 p-4 border-b border-gray-300 last:!border-b-0 hover:bg-gray-50">
            <span className="font-medium text-black text-04 tracking-wide">{head}</span>
            <div className="grid grid-cols-2 gap-0.5">
                {data.map(([key, value], i) => (
                    <Fragment key={i}>
                        <span className="text-gray-400 tracking-wide">{key}</span>
                        <span className="text-gray-700 tracking-wide font-medium">{value}</span>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default function OpenedAppointment(props: OpenedAppointmentProps) {
    const [appointment, setAppointment] = useState<DB_Appointment>();
    const [amountPaid, setAmountPaid] = useState<string>("None");

    useEffect(() => {
        const load = async () => {
            const appointment: DB_Appointment = await SelectAppointment({appointmentID: props.appointmentID});
            setAppointment(appointment);
        };
        load(); 
    }, [props.appointmentID]);

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
            className="flex flex-col justify-between w-[500px] h-screen max-h-screen overflow-y-scroll scroll-hide bg-white border-l border-gray-300 shadow-2xl fixed top-0 right-0"
            initial={{right: "-500px"}}
            animate={{right: "0px"}}
            exit={{right: "-500px"}}
            key="OpenedAppointment"
        >
            {/* Close Button */}
            <div className="flex justify-end px-4 py-3 border-b border-gray-300">
                <CloseButton close={props.closeAppointment}/>
            </div>
            {appointment &&
                <div>
                    <div className="px-4 py-4 flex flex-col items-center border-b border-gray-300">
                        {/* Full Name */}
                        <h6 className="text-gray-950 font-semibold text-3xl mb-2 text-center">
                            {appointment.FName} {appointment.LName}
                        </h6>
                        {/* Appointment ID */}
                        <div className="!w-min flex items-center gap-1 fill-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="size-4 stroke-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                            </svg>
                            <span className="w-min text-01 text-gray-400 font-medium whitespace-nowrap tracking-wider">
                                {appointment.AppointmentID}
                            </span>
                        </div>
                        {/* Creation Date */}
                        <div className="!w-min flex items-center gap-1 fill-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="size-4 stroke-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                            <span className="w-min text-01 text-gray-400 font-medium whitespace-nowrap tracking-wider">
                                Created on {toDisplayDate(appointment.CreationDate).slice(0, 12)}
                            </span>
                        </div>
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
                                                <li key={i} className="flex gap-1 items-center">
                                                    {appointment.Services.length > 1 &&
                                                        <span className="bg-gray-700 rounded-full w-1 h-1"></span>
                                                    }
                                                    <span className="text-gray-700 font-medium tracking-wide">{service.Service}</span>
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
            {/* Buttons for Ease-of-Access */}
            <div 
                className={clsx(
                    "flex",
                    "sticky bottom-0",
                    "bg-transparent border-t border-gray-300 after:absolute after:w-full after:h-[1px] after:bg-white after:top-[-2px] after:left-0"
                )}
            >
                <button
                    onClick={() => navigate(PAGE_VIEW_APPOINTMENT, {appointmentID: props.appointmentID})}
                    className="w-full bg-white/50  backdrop-blur-lg border-r-[0.5px] border-gray-300 px-4 py-4 text-gray-400 text-md font-medium tracking-wide hover:bg-gray-50 hover:text-black"
                >
                    View
                </button>
                <button
                    onClick={() => navigate(PAGE_EDIT_APPOINTMENT, {appointmentID: props.appointmentID})}
                    className="w-full bg-white/50 backdrop-blur-lg border-l-[0.5px] border-gray-300 px-4 py-4 text-gray-400 text-md font-medium tracking-wide hover:bg-gray-50 hover:text-black"
                >
                    Edit
                </button>
            </div>
        </motion.div>
        
    )
}