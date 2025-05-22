import Button from "@/component/Form/Button/Button";
import { DB_Appointment } from "@/services/DB/Interface/Appointment";
import SelectAppointment from "@/services/DB/Appointment/SelectAppointment";
import { goToUpdateAppointment } from "@/utils/redirect/goToUpdateAppointment";
import { goToViewAppointment } from "@/utils/redirect/goToViewAppointment";
import { Fragment, useEffect, useState } from "react";
import CloseButton from "@/component/Button/CloseButton";
import Hash from "@/component/Icon/Hash";
import { toDisplayDate } from "@/utils/convert";
import clsx from "clsx";

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
        <div className="flex flex-col gap-2 p-4 border-b border-gray-200 last:!border-b-0">
            <span className="font-medium text-gray-gray text-01 uppercase">{head}</span>
            <div className="grid grid-cols-2 gap-0.5">
                {data.map(([key, value], i) => (
                    <Fragment
                        key={i}
                    >
                        <span>{key}</span>
                        <span 
                            className={clsx(
                                "text-gray-700",
                                "font-medium"
                            )}
                        >
                            {value}
                        </span>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default function OpenedAppointment(props: OpenedAppointmentProps) {
    const [appointment, setAppointment] = useState<DB_Appointment>();
    // Calulcated Data
    const [amountPaid, setAmountPaid] = useState(0);

    useEffect(() => {
        const load = async () => {
            const appointment: DB_Appointment = await SelectAppointment({
                appointmentID: props.appointmentID
            });
            setAppointment(appointment);

            if (!appointment)
                return;

            // Calculating Amount Paid
            // It's not something that's just there.
            // We have to calculate this ourselves.
            let amountPaid = 0;
            for (const p of appointment.Payments)
                amountPaid += p.Payment;
            setAmountPaid(amountPaid);
        };
        load(); 
    }, [props.appointmentID]);

    return (
        <div 
            className={clsx(
                "flex flex-col",
                "max-h-screen overflow-y-scroll scroll-hide",
                "fixed top-0 right-0",
                "bg-white border-l border-gray-200 shadow"
            )}
        >
            {/* Close Button */}
            <div 
                className={clsx(
                    "flex justify-end px-4 py-3",
                    "border-b border-gray-200"
                )}
            >
                <CloseButton close={props.closeAppointment}/>
            </div>
            {appointment &&
                <div>
                    <div 
                        className={clsx(
                            "px-4 py-3",
                            "flex flex-col items-center",
                            "border-b border-gray-200"
                        )}
                    >
                        {/* Full Name */}
                        <h6 className="text-gray-950 font-medium text-06">
                            {appointment.FName} {appointment.LName}
                        </h6>
                        {/* Appointment ID */}
                        <div 
                            className={clsx(
                                "!w-min",
                                "flex items-center !gap-0",
                                "stroke-gray-400 fill-gray-400"
                            )}
                        >
                            <Hash
                                width="13"
                                height="13"
                                fill="inherit"
                                stroke="inherit"
                                strokeWidth="0.5"
                            />
                            <span 
                                className={clsx(
                                    "w-min",
                                    "text-02 font-medium",
                                    "whitespace-nowrap tracking-tighter"
                                )}
                            >{appointment.AppointmentID}</span>
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
                            ["Start Date", toDisplayDate(appointment.StartDate)],
                            ["End Date", toDisplayDate(appointment.EndDate)]
                        ]}
                    />
                    <DataGroup
                        head="Vehicle"
                        data={[
                            ["VIN", appointment.VIN],
                            ["ModelYear", appointment.ModelYear],
                            ["Make", appointment.Make],
                            ["Model", appointment.Model]
                        ]}
                    />
                    <DataGroup
                        head="Services"
                        data={[
                            ["Number of Services", appointment.Services.length],
                            ["Services", 
                                <ul>
                                    {appointment.Services.map((service, i) => (
                                        <li key={i}>
                                            <span 
                                                className={clsx(
                                                    "text-gray-700",
                                                    "font-medium"
                                                )}
                                            >{service.Service}</span>
                                        </li>
                                    ))}
                                </ul>
                            ]
                        ]}
                    />
                    <DataGroup
                        head="Payments"
                        data={[
                            ["Cost", `$${appointment.Cost}`],
                            ["Amount Paid", `$${amountPaid}`]
                        ]}
                    />
                </div>
            }
            {/* Buttons for Ease-of-Access */}
            <div 
                className={clsx(
                    "flex gap-3 p-4",
                    "sticky bottom-0",
                    "bg-white border-t border-gray-200"
                )}
            >
                <Button
                    label="View Appointment"
                    style="boring small"
                    onClick={() => {
                        goToViewAppointment(props.appointmentID);
                    }}
                />
                <Button
                    label="Edit Appointment"
                    style="boring small"
                    onClick={() => {
                        goToUpdateAppointment(props.appointmentID);
                    }}
                />
            </div>
        </div>
    )
}