import TrashIcon from "@/component/Icon/Trash";
import clsx from "clsx";

interface DeleteButtonProps {
    onDelete: () => void;
}

export default function DeleteButton(props: DeleteButtonProps) {
    return (
        <button
            onClick={props.onDelete}
            className={clsx(
                "rounded p-1 bg-white w-min hover:bg-gray-50 hover:shadow-xs transition-all",
                "border border-gray-300 shadow-sm stroke-gray-400 hover:stroke-black"
            )}
        >
            <TrashIcon/>
        </button>
    )
}