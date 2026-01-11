import IconButton from "@/component/Button/IconButton";
import { PAGE_EDIT_APPOINTMENT } from "@/utils/constants";
import { navigateToPage } from "@/utils/navigate";
import { PencilIcon } from "lucide-react";

export default function EditAppointmentButton(props: {appointmentID: string; size?: 10|12|14|16;}) {
    return (
        <IconButton
            size={props.size || 14}
            onClick={() => navigateToPage(PAGE_EDIT_APPOINTMENT, {appointmentID: props.appointmentID})}
            className="rounded-[5px] shadow-xs dark:shadow-md"
        >
            <PencilIcon
                className="size-3 stroke-inherit"
            />
        </IconButton>
    )
}