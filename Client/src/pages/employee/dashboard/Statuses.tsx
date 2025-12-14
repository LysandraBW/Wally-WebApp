import clsx from "clsx";
import { FilterManager } from "./managers/useFilterManager";

interface StatusesProps {
    filterManager: FilterManager;
}

export default function Statuses(props: StatusesProps) {
    return (
        <ul 
            className={clsx(
                "flex gap-4 px-2 py-2",
                "border-b border-gray-300 bg-white"
            )}
        >
            {props.filterManager.statuses.map((status, i) => (
                <li
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
                </li>
            ))}
        </ul>
    )
}