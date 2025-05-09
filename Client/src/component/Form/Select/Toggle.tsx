import ExpandIcon from "@/component/Icon/Expand";
import { ReactNode } from "react";
import clsx from "clsx";

interface ToggleProps {
    open: boolean;
    label: ReactNode;
    multiple: boolean;
    style?: string;
}

export default function Toggle(props: ToggleProps) {
    return (
        <div 
            // tabIndex={0}
            className={clsx(
                "field grid grid-cols-[auto_13px] min-h-10",
                "gap-3 justify-between items-center p-1 pr-3",
                props.style
            )}
        >
            <div className="overflow-x-auto scroll-hide font-normal !text-gray-400">
                {props.label}
            </div>
            <ExpandIcon
                stroke="#1F2937"
            />
        </div>
    )
}