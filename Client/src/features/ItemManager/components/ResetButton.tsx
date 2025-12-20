import ArrowPath from "@/component/Icon/Icons/ArrowPath";
import ArrowClockwiseIcon from "@/component/Icon/Icons/ArrowPath";
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
                "rounded p-1 bg-white w-min hover:bg-gray-50 hover:shadow-xs transition-all",
                "border border-gray-300 shadow-sm stroke-gray-400 hover:stroke-black"
            )}
        >
            <ArrowPath/>
        </button>
    )
}