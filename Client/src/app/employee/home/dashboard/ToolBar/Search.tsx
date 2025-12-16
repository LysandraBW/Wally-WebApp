import { useState } from "react";
import { FilterManager } from "../managers/useFilterManager";
import clsx from "clsx";

interface SearchProps {
    filterManager: FilterManager;
}

export default function Search(props: SearchProps) {
    const [search, setSearch] = useState("");

    return (
        <div className="grow h-[28px] flex border border-gray-300 shadow-sm rounded focus-within:bg-white bg-gray-50 focus-within:text-gray-700 text-gray-400">
            <div
                onClick={(event) => props.filterManager.setSearch(search)} 
                className={clsx(
                    "w-min px-2 flex items-center justify-center",
                    "bg-gray-50 rounded-l-[3px]",
                    "border-r border-r-inherit",
                    "text-xs text-inherit font-medium tracking-wide",
                    "cursor-pointer hover:bg-gray-100"
                )}
            >
                    Search
            </div>
            <input
                type="text"
                value={search}
                onKeyDown={(event) => event.key === "Enter" && props.filterManager.setSearch(search)}
                onChange={(event) => setSearch(event.target.value)}
                className="bg-white peer w-full px-2 tracking-wide !rounded-r-md !h-[26px] text-xs focus:outline-none focus:text-gray-700"
            />
        </div>
    )
}