import clsx from "clsx";
import { FilterManager } from "./managers/useFilterManager";
import { Fragment } from "react";

interface TabsL2Props {
    filterManager: FilterManager;
}

export default function TabsL2(props: TabsL2Props) {
    return (
        <Fragment>
            {props.filterManager.statuses.map((status, i) => (
                <div
                    key={i}
                    className={clsx(
                        "w-min px-2 relative cursor-pointer",
                        "rounded border border-transparent",
                        "flex justify-between items-center gap-2",
                        status[0] === props.filterManager.statusID && `
                            after:absolute
                            after:w-full after:h-[1px]
                            after:bg-blue-500
                            after:top-[calc(100%+8px)] after:left-0
                        `
                    )}
                    onClick={() => props.filterManager.setStatusID(status[0])}
                >
                    <span 
                        className={clsx(
                            "text-xs tracking-wide whitespace-nowrap",
                            status[0] !== props.filterManager.statusID && "text-base-500",
                            status[0] === props.filterManager.statusID && "text-blue-500 font-medium"
                        )}
                    >
                        {status[1]}
                    </span>
                </div>
            ))}
        </Fragment>
    )
}