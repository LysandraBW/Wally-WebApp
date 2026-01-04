import { toDisplayDate } from "@/utils/convert";
import { Fragment } from "react";
import HeaderData from "./HeaderData";
import IconButton from "@/component/Button/IconButton";
import ArrowLongLeftIcon from "@/component/Icons/Icons/ArrowLongLeftIcon";

export default function Header(props: any) {
    return (
        <Fragment>
            <div className="px-2 py-2 flex justify-start gap-2 items-center border-b border-base-300 dark:border-base-200">
                <IconButton
                    size={14}
                    onClick={props.close}
                    className="rounded-[5px] shadow-xs dark:shadow-md"
                >
                    <ArrowLongLeftIcon
                        className="size-4 stroke-base-500"
                    />
                </IconButton>
                <h1 className="text-sm text-base-700 font-medium tracking-wide">
                    Appointment: {props.appointment.FName} {props.appointment.LName}'s {props.appointment.ModelYear} {props.appointment.Make} {props.appointment.Model}
                </h1>
            </div>
            <div className="flex border-b border-base-300 dark:border-base-200">
                <HeaderData
                    k="ID"
                    v={props.appointmentID}
                />
                <HeaderData
                    k={"Created"}
                    v={toDisplayDate(props.appointment.CreationDate)}
                />
                <HeaderData
                    k={"Updated"}
                    v={toDisplayDate(props.appointment.UpdationDate)}
                />
            </div>
        </Fragment>
    )
}