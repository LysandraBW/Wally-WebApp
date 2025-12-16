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
                "border-r border-r-gray-300 bg-gray-100 border-b border-b-gray-300",
                "whitespace-nowrap cursor-pointer hover:!bg-white",
                !props.seen && "!bg-white",
                props.style,
            )}
            onClick={props.onClick}
        >
            {(props.showNewFlag && !props.seen) &&
                <span className="bg-white border border-gray-300 text-blue-500 tracking-wide font-semibold text-[0.4rem] py-[2px] px-[4px] rounded-sm">NEW</span>
            }
            {props.children}
            <p className="w-min text-gray-700 tracking-wider text-[0.8rem] whitespace-nowrap group-hover:text-blue-500 overflow-hidden text-ellipsis">
                {stringL}
                <b className="font-medium">{stringM}</b>
                {stringR}
            </p>
        </div>
    )
}