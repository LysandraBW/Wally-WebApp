import clsx from "clsx";
import { FilterManager } from "./managers/useFilterManager";
import { Fragment } from "react";

interface StatusTabsProps {
    filterManager: FilterManager;
}

export default function StatusTabs(props: StatusTabsProps) {
    return (
        <Fragment>
            {props.filterManager.statuses.map((status, i) => (
                <div
                    key={i}
                    className={clsx(
                        "relative cursor-pointer hover:bg-gray-50",
                        "w-min rounded border border-transparent",
                        "flex justify-between items-center gap-2 px-1",
                        status[0] === props.filterManager.statusID && `
                            after:absolute
                            after:w-full after:h-[3px]
                            after:bg-blue-500
                            after:bottom-[-9px] after:left-0
                        `
                    )}
                    onClick={() => props.filterManager.setStatusID(status[0])}
                >
                    <span 
                        className={clsx(
                            "whitespace-nowrap font-normal text-02 tracking-wide", 
                            status[0] === props.filterManager.statusID && "!text-black !font-medium"
                        )}
                    >
                        {status[1]}
                    </span>
                </div>
            ))}
        </Fragment>
    )
}