import clsx from "clsx";

export default function SearchBar(props: {searchPlaceholder?: string; search: string; setSearch: (value: string) => void}) {
    return (
        <input 
            className={clsx(
                "w-full px-2 py-2",
                "bg-base-0 dark:bg-base-50 border-b border-b-base-300 dark:border-b-base-200 outline-none",
                "text-sm text-base-500 dark:text-base-400 placeholder:text-base-500 dark:text-base-400 tracking-wide"
            )}
            value={props.search} 
            placeholder={props.searchPlaceholder || "Search"}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => props.setSearch(event.target.value)}
        />
    )
}