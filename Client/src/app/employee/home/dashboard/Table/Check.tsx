import clsx from "clsx";
import { ToggleManager } from "../managers/useToggleManager";
import Checkbox from "@/component/Form/Checkbox/Checkbox";
import { Appointment } from "../managers/useAppointmentManager";

export default function Check(props: {seen: boolean; toggleManager: ToggleManager; appointment: Appointment, i?: number}) {
    return (
        <div 
            className={clsx(
                "size-8 aspect-square",
                "flex justify-center items-center",
                "border-b border-r border-base-300 dark:border-base-200",
                "hover:!bg-white dark:hover:!bg-base-200",
                !props.seen && "bg-base-100 dark:bg-base-0",
                props.seen && "!bg-base-200 dark:!bg-base-50",
            )}
            data-row={props.i || ""}
        >
            <Checkbox
                name=""
                value=""
                className="bg-base-100 dark:bg-base-50 !size-3 !rounded-sm"
                checked={props.toggleManager.selectedAppointments.includes(props.appointment.AppointmentID)}
                onChange={() => props.toggleManager.toggleAppointmentSelection(props.appointment.AppointmentID)}
            />
        </div>
    )
}