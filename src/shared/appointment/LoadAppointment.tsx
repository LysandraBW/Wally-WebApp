import clsx from "clsx";
import { UseForm } from "../../features/Form/useForm/useForm";
import { Tooltip } from "react-tooltip";
import ArrowLongRightIcon from "@/component/Icons/Icons/ArrowLongRightIcon";
import { useEffect, useState } from "react";
import SelectAllAppointments from "@/services/db/Appointment/SelectAllAppointments";
import Search from "@/component/Form/Select/Search";
import { Appointment } from "waltronics-types";

interface LoadAppointmentProps {
    form: UseForm;
    head: string;
    body: string;
    loadAppointment: () => void;
    appointmentNotFound: boolean;
    setAppointmentNotFound: (b: boolean) => void;
}

export default function LoadAppointment(props: LoadAppointmentProps) {
    const [appointments, setAppointments] = useState<Array<Appointment>>([]);


    useEffect(() => {
        const loadAppointments = async () => {
            const appointments = await SelectAllAppointments({});
            setAppointments(appointments.Appointments);
        }
        loadAppointments();
    }, []);


    return (
         <div className="flex flex-col gap-4 grow items-center justify-center">
            <div>
                <p className="text-base text-center text-base-900 font-medium whitespace-nowrap">
                    {props.head}
                </p>
                <span className="block text-sm text-center tracking-wide text-base-500 dark:text-base-400 font-normal">
                    {props.body}
                </span>
            </div>
            <div className="flex items-center h-min">
                <div className="w-[400px] h-full">
                    <Search
                        name="id"
                        toggleLabel="Select Appointment"
                        state={props.form && props.form.getInput("id").state}
                        values={props.form && props.form.getInput("id").data}
                        options={appointments.map((appointment) => [
                            appointment.AppointmentID, 
                            `${appointment.AppointmentID}, ${appointment.FName} ${appointment.LName}, ${appointment.ModelYear} ${appointment.Make} ${appointment.Model}`, 
                            <div className="flex flex-col items-start py-1">
                                <span className="block text-xs text-base-700 tracking-wide font-medium">
                                    {appointment.FName} {appointment.LName}
                                </span>
                                <span className="block text-xs text-base-500 dark:text-base-400 tracking-wide">
                                    {appointment.ModelYear} {appointment.Make} {appointment.Model}
                                </span>
                            </div>
                        ])}
                        toggleClassName="dark:shadow-md"
                        onChange={props.form?.updateInputData}
                        disabled={false}
                    />
                </div>
                <button 
                    onClick={props.loadAppointment}
                    className={clsx(
                        "h-full aspect-square ml-2",
                        "flex items-center justify-center",
                        "bg-base-50 border border-base-300 dark:border-base-200 dark:shadow-md shadow-sm",
                        "group stroke-base-500 dark:stroke-white",
                        "cursor-pointer hover:bg-base-100 dark:hover:bg-blue-500 "
                    )}
                >
                    <ArrowLongRightIcon
                        className="size-4 stroke-[2px] cursor-pointer rotate-[360deg] dark:stroke-white"
                    />
                </button>
            </div>
            <Tooltip
                isOpen={props.appointmentNotFound}
                anchorSelect="#loadInput"
                opacity={1}
                place="bottom"
                border={"1px solid #fcd34d"}
                style={{
                    backgroundColor: "#fffbeb",
                    boxShadow: "0px 2px 2px 0px #00000010",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0rem",
                    borderRadius: "6px",
                }}
            >
                <h6 className="text-02 tracking-wide text-gray-600">
                    No appointment has this information. Please try again.
                </h6>
            </Tooltip>
        </div>
    )
}