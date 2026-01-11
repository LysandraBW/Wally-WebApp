import ChevronDownIcon from "@/component/Icons/Icons/ChevronDownIcon";
import clsx from "clsx";
import { ReactNode } from "react";

interface ToggleProps {
    icon?: ReactNode;
    label?: ReactNode;
    smaller?: boolean;
    disabled?: boolean;
    onClick: () => void;
    className?: string;
}

export default function Toggle(props: ToggleProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                "w-full h-full px-2 py-1",
                "flex items-center justify-between gap-2",
                "field-border field-background field-border",
                props.disabled && "cursor-default",
                !props.disabled && "field-hover field-focus",
                props.className
            )}
        >
            <span 
                className={clsx(
                    "field-text",
                    props.smaller && "!text-xs",
                    props.disabled && "!text-base-400"
                )}
            >
                {props.label || "Select"}
            </span>
            {props.icon ?
                props.icon 
                :
                <ChevronDownIcon
                    className="size-3 stroke-base-500 dark:stroke-base-400 stroke-[3px]"
                />
            }
        </button>
    )
}