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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[16px] h-[16px] stroke-inherit cursor-pointer transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>

        </button>
    )
}