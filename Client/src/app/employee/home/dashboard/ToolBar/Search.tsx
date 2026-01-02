import { useState } from "react";
import { FilterManager } from "../managers/useFilterManager";
import clsx from "clsx";

interface SearchProps {
    filterManager: FilterManager;
}

export default function Search(props: SearchProps) {
    const [search, setSearch] = useState("");

    return (
        <div 
            className={clsx(
                "h-[28px] flex grow",
                "focus-within:bg-base-0 bg-base-100 dark:bg-base-50",
                "border border-base-300 dark:border-base-200 shadow-sm rounded-md",
                "focus-within:text-gray-700 text-gray-500"
            )}
        >
            <div
                onClick={(event) => props.filterManager.setSearch(search)} 
                className={clsx(
                    "w-min px-2 flex items-center justify-center",
                    "bg-base-0 dark:bg-base-50 hover:bg-base-100",
                    "border-r border-r-inherit rounded-l-[5px]",
                    "text-xs text-inherit font-medium tracking-wide",
                    "cursor-pointer"
                )}
            >
                Search
            </div>
            <input
                type="text"
                value={search}
                onKeyDown={(event) => event.key === "Enter" && props.filterManager.setSearch(search)}
                onChange={(event) => setSearch(event.target.value)}
                className="bg-base-0 dark:bg-base-50 peer w-full px-2 tracking-wide !rounded-r-md !h-[26px] text-xs focus:outline-none focus:text-gray-700"
            />
        </div>
    )
}