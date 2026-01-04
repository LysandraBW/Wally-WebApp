import IconButton from "@/component/Button/IconButton";
import TrashIcon from "@/component/Icons/Icons/TrashIcon";

interface DeleteButtonProps {
    onDelete: () => void;
}

export default function DeleteButton(props: DeleteButtonProps) {
    return (
        <IconButton
            onClick={props.onDelete}
        >
            <TrashIcon
                className="size-3 stroke-inherit"
            />
        </IconButton>
    )
}