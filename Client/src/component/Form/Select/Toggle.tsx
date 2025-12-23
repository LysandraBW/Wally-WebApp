import ChevronDownIcon from "@/component/Icons/Icons/ChevronDownIcon";
import clsx from "clsx";
import { ReactNode } from "react";

interface ToggleProps {
    icon?: ReactNode;
    label?: string;
    onClick: () => void;
}

export default function Toggle(props: ToggleProps) {
    return (
        <button
            onClick={() => props.onClick}
            className={clsx(
                "w-full h-min px-2 py-1",
                "flex items-center justify-between gap-2",
                "surface-hover surface-border field-bg-shadow field-border field-focus",
            )}
        >
            <span className="field-text">
                {props.label || "Select"}
            </span>
            {props.icon ?
                props.icon 
                :
                <ChevronDownIcon
                    class="size-3 stroke-base-500 stroke-[3px]"
                />
            }
        </button>
    )
}