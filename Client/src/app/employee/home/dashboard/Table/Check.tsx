import clsx from "clsx";
import { ToggleManager } from "../managers/useToggleManager";
import Checkbox from "@/component/Form/Checkbox/Checkbox";
import { Appointment } from "../managers/useAppointmentManager";

export default function Check(props: {seen: boolean; toggleManager: ToggleManager; appointment: Appointment, i?: number}) {
    return (
        <div 
            className={clsx(
                "p-2",
                "!border-l-0",
                "border-r border-r-gray-300",
                "border-b border-b-gray-300",
                !props.seen && "bg-white"
            )}
            data-row={props.i || ""}
        >
            <Checkbox
                name=""
                value=""
                checked={props.toggleManager.selectedAppointments.includes(props.appointment.AppointmentID)}
                onChange={() => props.toggleManager.toggleAppointmentSelection(props.appointment.AppointmentID)}
            />
        </div>
    )
}