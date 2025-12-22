import clsx from "clsx";
import { useEffect, useState } from "react";
import Check from "../Icon/Icons/CheckIcon";
import ClipboardIcon from "../Icon/Icons/ClipboardIcon";
import IconButton from "../Button/IconButton";

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
                "border border-base-300 rounded-md",
                "bg-base-0 shadow-sm"
            )}
        >
            <span 
                className={clsx(
                    "py-1 px-2",
                    "border-r border-r-base-300 rounded-l-[5px]",
                    "text-base-500 text-sm",
                    "bg-base-100"
                )}
            >
                {props.label}
            </span>
            <span 
                className={clsx(
                    "py-1 px-2",
                    "font-medium text-sm text-base-700",
                    "tracking-wide whitespace-nowrap"
                )}
            >
                {props.value}
            </span>
            <button 
                onClick={copyValue}
                className={clsx(
                    "py-1 px-2",
                    "flex justify-between items-center",
                    "border-l border-l-base-300 rounded-none rounded-r-[5px]",
                    "surface clickable !bg-base-100",
                    "cursor-pointer transition-all"
                )}
            >
                {clicked &&
                    <Check
                        style={{
                            width: "16px",
                            height: "16px",
                            cursor: "pointer",
                            strokeWidth: "2px"
                        }}
                        class="stroke-green-500"
                    />
                }
                {!clicked &&
                    <ClipboardIcon
                        style={{
                            width: "16px",
                            height: "16px",
                            cursor: "pointer",
                            strokeWidth: "1.5px"
                        }}
                        class="stroke-inherit"
                    />
                }
            </button>
        </div>
    )
}