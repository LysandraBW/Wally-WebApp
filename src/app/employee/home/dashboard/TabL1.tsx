import useFilterManager from "./managers/useFilterManager";
import clsx from "clsx";
import { ReactNode } from "react";

interface TabL1Props {
    icon: ReactNode;
    label: string;
    labelID: string;
    filterManager: ReturnType<typeof useFilterManager>;
    onClick: (labelID: string) => void;
}

export default function TabL1(props: TabL1Props) {
    return (
        <div
            className={clsx(
                "w-full py-1 px-2",
                "flex items-center gap-2",
                "rounded-md",
                "cursor-pointer",
                props.filterManager.labelID !== props.labelID && "surface-border hover:bg-base-200 dark:bg-base-50 dark:hover:bg-base-0 stroke-base-400",
                props.filterManager.labelID === props.labelID && "surface-border bg-base-0 dark:bg-[#121315] shadow-sm stroke-base-700"
            )}
            onClick={() => props.onClick(props.labelID)}
        >
            {props.icon}
            <label
                className={clsx(
                    "text-xs tracking-wide",
                    props.filterManager.labelID !== props.labelID && "text-base-400",
                    props.filterManager.labelID === props.labelID && "text-base-700"
                )}
            >
                {props.label}
            </label>
        </div>
    )
}