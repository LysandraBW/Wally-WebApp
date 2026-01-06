import IconButton from "@/component/Button/IconButton";
import TrashIcon from "@/component/Icons/Icons/TrashIcon";

interface DeleteButtonProps {
    onDelete: () => void;
}

export default function DeleteButton(props: DeleteButtonProps) {
    return (
        <IconButton
            size={14}
            onClick={props.onDelete}
            className="rounded-[5px] shadow-xs dark:shadow-md"
        >
            <TrashIcon
                className="size-4 stroke-inherit stroke-[1.75px]"
            />
        </IconButton>
    )
}