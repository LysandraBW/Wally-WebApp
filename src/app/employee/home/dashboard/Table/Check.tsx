import clsx from "clsx";
import { ToggleManager } from "../managers/useToggleManager";
import Checkbox from "@/component/Form/Checkbox/Checkbox";
import { Appointment } from "../managers/useAppointmentManager";

export default function Check(props: {seen: boolean; toggleManager: ToggleManager; appointment: Appointment, i?: number}) {
    return (
        <div 
            className={clsx(
                "table-entry",
                props.seen && "seen",
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