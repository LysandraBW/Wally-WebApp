import IconButton from "@/component/Button/IconButton";
import EyeIcon from "@/component/Icons/Icons/EyeIcon";
import { PAGE_VIEW_APPOINTMENT } from "@/utils/constants";
import { navigateToPage } from "@/utils/navigate";

export default function ViewAppointmentButton(props: {appointmentID: string; size?: 10|12|14|16}) {
    return (
        <IconButton
            size={props.size || 14}
            onClick={() => navigateToPage(PAGE_VIEW_APPOINTMENT, {appointmentID: props.appointmentID})}
            className="rounded-[5px] shadow-xs dark:shadow-md"
        >
            <EyeIcon
                className="size-3 stroke-[2px] stroke-inherit"
            />
        </IconButton>
    )
}