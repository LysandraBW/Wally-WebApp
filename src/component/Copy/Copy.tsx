import clsx from "clsx";
import { useEffect, useState } from "react";
import Check from "../Icons/Icons/CheckIcon";
import ClipboardIcon from "../Icons/Icons/ClipboardIcon";

interface CopyProps {
    label: string;
    value: string;
}

export default function Copy(props: CopyProps) {
    const [clicked, setClicked] = useState(false);


    const copyValue = () => {
        navigator.clipboard.writeText(props.value);
        setClicked(true);
    }


    useEffect(() => {
        if (!clicked)
            return;
        setTimeout(() => {
            setClicked(false);
        }, 5*1000);
    }, [clicked]);


    return (
        <div 
            className={clsx(
                "w-min h-min",
                "grid grid-cols-[min-content_min-content_min-content]",
                "surface-border rounded-md",
                "bg-base-0 shadow-sm"
            )}
        >
            <span 
                className={clsx(
                    "py-1 px-2",
                    "surface-border !border-y-0 !border-l-0 border-r border-r-base-300 rounded-l-[5px]",
                    "text-base-500 dark:text-base-400 text-xs max-md:text-sm",
                    "bg-base-100 dark:bg-base-50"
                )}
            >
                {props.label}
            </span>
            <span 
                className={clsx(
                    "py-1 px-2",
                    "font-medium text-xs max-md:text-sm text-base-700",
                    "tracking-wide whitespace-nowrap max-md:text-ellipsis max-md:overflow-x-clip"
                )}
            >
                {props.value}
            </span>
            <button 
                onClick={copyValue}
                className={clsx(
                    "py-1 px-2",
                    "flex justify-between items-center",
                    "surface-border !border-y-0 !border-r-0 border-l border-l-base-300 rounded-none rounded-r-[5px]",
                    "surface-color surface-background-hover surface-color-hover !bg-base-100 dark:!bg-base-50",
                    "cursor-pointer transition-all"
                )}
            >
                {clicked &&
                    <Check
                        className="size-4 stroke-green-500 stroke-[2px]"
                    />
                }
                {!clicked &&
                    <ClipboardIcon
                        className="size-3.5 stroke-inherit stroke-[1.5px]"
                    />
                }
            </button>
        </div>
    )
}