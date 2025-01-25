import ArrowClockwiseIcon from "@/component/Icon/ArrowClockwise";
import TrashIcon from "@/component/Icon/Trash";
import clsx from "clsx";

interface ResetButtonProps {
    onReset: () => void;
}

export default function ResetButton(props: ResetButtonProps) {
    return (
        <button
            onClick={props.onReset}
            className={clsx(
                "rounded p-1 bg-white w-min hover:bg-gray-50",
                "border border-gray-200"
            )}
        >
            <ArrowClockwiseIcon
                width="16"
                height="16"
                fill="#9CA3AF"
                color="#9CA3AF"
                stroke="#9CA3AF"
                strokeWidth="0.5"
                cursor="pointer"
            />
        </button>
    )
}