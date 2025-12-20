import clsx from "clsx";
import { useState } from "react";
import Clipboard from "../IconV2/Clipboard";
import Check from "../Icon/Icons/CheckmarkIcon";

interface CopyProps {
    label: string;
    value: string;
}

export default function Copy(props: CopyProps) {
    const [clicked, setClicked] = useState(false);

    const copyValue = () => {
        navigator.clipboard.writeText(props.value);
    }

    return (
        <div 
            onClick={() => {
                copyValue();
                // To show that the user has copied the
                // value, we change the board to a check.
                setClicked(true);
                setTimeout(() => {
                    setClicked(false);
                }, 1*1000);

            }}
            className={clsx(
                "w-min",
                "flex justify-between items-center",
                "border border-gray-200 rounded-md",
                "bg-white shadow-sm",
                "transition-all hover:bg-gray-50 cursor-pointer"
            )}
        >
            <span 
                className={clsx(
                    "py-1 px-2",
                    "border-r border-r-gray-200 rounded-l-[5px]",
                    "font-medium text-gray-400 text-xs tracking-wide",
                    "bg-gray-100"
                )}
            >
                {props.label}
            </span>
            <span 
                className={clsx(
                    "py-1 px-2",
                    "font-medium text-xs text-gray-700",
                    "tracking-wide whitespace-nowrap"
                )}
            >
                {props.value}
            </span>
            <span 
                className={clsx(
                    "h-full",
                    "py-1 px-2",
                    "font-medium text-gray-400 text-xs tracking-wide",
                    "border-l border-l-gray-200 rounded-r-[5px]",
                    "bg-gray-100"
                )}
            >
                {clicked &&
                    <Check
                        style="size-3.5 stroke-2 stroke-emerald-500"
                    />
                }
                {!clicked &&
                    <Clipboard
                        style="size-3.5 stroke-1.5 stroke-gray-400"
                    />
                }
            </span>
        </div>
    )
}