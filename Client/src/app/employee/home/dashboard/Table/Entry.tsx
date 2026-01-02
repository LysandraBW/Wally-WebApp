"use client";
import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";

interface TableEntryProps {
    entry: string;
    search: string;
    style?: string;
    seen: boolean;
    i?: number;
    showNewFlag?: boolean;
    children?: ReactNode;
    onClick: () => void;
}

export default function TableEntry(props: TableEntryProps) {
    const [stringL, setStringL] = useState(props.entry || "N/A");
    const [stringM, setStringM] = useState("");
    const [stringR, setStringR] = useState("");

    useEffect(() => {
        if (!props.search || !props.entry) {
            setStringL(props.entry || "");
            return;
        }
        
        const upperCasedEntry = props.entry.toUpperCase();
        const upperCasedSearch = props.search.toUpperCase();

        let stringL = "";
        let stringM = "";
        let stringR = "";

        // The entry does not include the search.
        if (!upperCasedEntry.includes(upperCasedSearch)) {
            stringL = props.entry;
        }
        else {
            const index = upperCasedEntry.indexOf(upperCasedSearch);
            const searchLength = props.search.length;

            stringL = props.entry.substring(0, index);
            stringM = props.entry.substring(index, index + searchLength);
            stringR = props.entry.substring(index + searchLength);
        }

        setStringL(stringL);
        setStringM(stringM);
        setStringR(stringR);
    }, [props.entry, props.search]);

    return (
        <div 
            data-row={props.i || ""}
            className={clsx(
                "w-full h-full px-2 py-0 flex gap-2 items-center overflow-clip",
                "border-r border-b border-base-300 dark:border-base-200",
                "hover:!bg-white dark:hover:!bg-base-200",
                "cursor-pointer",
                !props.seen && "bg-base-100 dark:bg-base-0",
                props.seen && "bg-base-200 dark:bg-base-50",
                props.style,
            )}
            onClick={props.onClick}
        >
            {(props.showNewFlag && !props.seen) &&
                <div className="bg-blue-500 size-1"/>
            }
            {props.children}
            <p 
                className={clsx(
                    "w-min text-gray-700 tracking-wide text-xs whitespace-nowrap group-hover:text-blue-500 overflow-hidden text-ellipsis",
                    !props.seen && "font-medium"
                )}
            >
                {stringL}
                <b className="bg-blue-500 text-white">{stringM}</b>
                {stringR}
            </p>
        </div>
    )
}