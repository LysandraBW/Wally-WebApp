import { formatDate } from "@/utils/convert";
import { Fragment } from "react";
import HeaderData from "./HeaderData";
import IconButton from "@/component/Button/IconButton";
import ArrowLongLeftIcon from "@/component/Icons/Icons/ArrowLongLeftIcon";
import { Appointment } from "waltronics-types";
import ViewAppointmentButton from "./Buttons/ViewAppointmentButton";
import EditAppointmentButton from "./Buttons/EditAppointmentButton";


interface HeaderProps {
    close: () => void; 
    goToEdit?: boolean;
    goToView?: boolean;
    appointment: Appointment; 
    appointmentID: string;
}


export default function Header(props: HeaderProps) {
    return (
        <Fragment>
            <div className="px-2 py-2 flex justify-between items-center border-b border-base-300 dark:border-base-200">
                <div className="flex justify-start gap-3 items-center">
                    <IconButton
                        size={14}
                        onClick={props.close}
                        className="rounded-[5px] shadow-xs dark:shadow-md"
                    >
                        <ArrowLongLeftIcon
                            className="size-4 stroke-inherit"
                        />
                    </IconButton>
                    <h1 className="text-sm text-base-700 font-medium tracking-wide">
                        Appointment: {props.appointment?.FName} {props.appointment?.LName}'s {props.appointment?.ModelYear} {props.appointment?.Make} {props.appointment?.Model}
                    </h1>
                </div>
                {props.goToEdit &&
                    <EditAppointmentButton
                        appointmentID={props.appointmentID}
                    />
                }
                {props.goToView &&
                    <ViewAppointmentButton
                        appointmentID={props.appointmentID}
                    />
                }
            </div>
            <div className="flex border-b border-base-300 dark:border-base-200">
                <HeaderData
                    k="ID"
                    v={props.appointmentID}
                />
                <HeaderData
                    k={"Created"}
                    v={formatDate(props.appointment?.CreationDate)}
                />
                <HeaderData
                    k={"Updated"}
                    v={formatDate(props.appointment?.UpdationDate)}
                />
            </div>
        </Fragment>
    )
}