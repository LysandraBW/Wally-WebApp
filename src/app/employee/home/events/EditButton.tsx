import IconButton from "@/component/Button/IconButton";
import { PencilIcon } from "lucide-react";

export default function EditButton({onUpdate}: {onUpdate: () => void}) {
    return (
        <IconButton
            size={14}
            onClick={onUpdate}
            className="rounded-[5px] shadow-xs dark:shadow-md"
        >
            <PencilIcon
                className="size-3 stroke-inherit stroke-[2px]"
            />
        </IconButton>
    )
}