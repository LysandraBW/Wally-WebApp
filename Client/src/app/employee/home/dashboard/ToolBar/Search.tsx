import { useState } from "react";
import { FilterManager } from "../managers/useFilterManager";

interface SearchProps {
    filterManager: FilterManager;
}

export default function Search(props: SearchProps) {
    const [search, setSearch] = useState("");

    return (
        <div className="grow h-[28px] flex border border-gray-300 shadow-sm rounded focus-within:bg-white bg-gray-50 focus-within:text-black text-gray-400">
            <div className="w-min px-2 bg-gray-50 rounded-l-[3px] text-xs text-inherit font-medium tracking-wide flex items-center justify-center border-r border-r-inherit">Search</div>
            <input
                type="text"
                value={search}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        props.filterManager.setSearch(search);
                    }
                }}
                onChange={(event) => setSearch(event.target.value)}
                className="bg-white peer w-full px-2 tracking-wide !rounded-r-md !h-[26px] text-xs focus:outline-none"
            />
        </div>
    )
}