import clsx from "clsx";

export default function SearchBar(props: {searchPlaceholder?: string; search: string; setSearch: (value: string) => void}) {
    return (
        <input 
            className={clsx(
                "w-full px-2 py-1",
                "bg-base-0 border-b border-b-base-300 outline-none",
                "text-sm text-base-500 placeholder:text-base-500 tracking-wide"
            )}
            value={props.search} 
            placeholder={props.searchPlaceholder || "Search"}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => props.setSearch(event.target.value)}
        />
    )
}