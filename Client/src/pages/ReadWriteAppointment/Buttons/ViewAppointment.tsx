import IconButton from "@/component/Button/IconButton";
import DocumentIcon from "@/component/Icons/Icons/DocumentIcon";
import EyeIcon from "@/component/Icons/Icons/EyeIcon";
import { PAGE_VIEW_APPOINTMENT } from "@/utils/constants";
import { navigate } from "@/utils/navigate";
import { PencilIcon } from "lucide-react";

export default function ViewAppointment(props: {appointmentID: string; size?: 10|12|14|16}) {
    return (
        <IconButton
            size={props.size || 14}
            onClick={() => navigate(PAGE_VIEW_APPOINTMENT, {appointmentID: props.appointmentID})}
            className="rounded-[5px] shadow-xs dark:shadow-md"
        >
            <EyeIcon
                className="size-3 stroke-[2px] stroke-inherit"
            />
        </IconButton>
    )
}