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
                "rounded p-1 bg-white w-min hover:bg-gray-50",
                "border border-gray-200"
            )}
        >
            <TrashIcon
                width="16"
                height="16"
                fill="#9CA3AF"
                color="#9CA3AF"
                stroke="#9CA3AF"
                strokeWidth="0.25"
                cursor="pointer"
            />
        </button>
    )
}