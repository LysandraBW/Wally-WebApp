import ChevronDownIcon from "@/component/Icons/Icons/ChevronDownIcon";
import clsx from "clsx";
import { ReactNode } from "react";

interface ToggleProps {
    icon?: ReactNode;
    label?: ReactNode;
    onClick: () => void;
    smaller?: boolean;
}

export default function Toggle(props: ToggleProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                "w-full h-full px-2 py-1",
                "flex items-center justify-between gap-2",
                "field-hover field-border field-background field-border field-focus",
            )}
        >
            <span 
                className={clsx(
                    "field-text",
                    props.smaller && "!text-xs"
                )}
            >
                {props.label || "Select"}
            </span>
            {props.icon ?
                props.icon 
                :
                <ChevronDownIcon
                    className="size-3 stroke-base-500 stroke-[3px]"
                />
            }
        </button>
    )
}