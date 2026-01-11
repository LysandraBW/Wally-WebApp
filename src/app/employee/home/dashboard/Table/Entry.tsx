"use client";
import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";

interface TableEntryProps {
    entry: string;
    search: string;
    style?: string;
    seen: boolean;
    i?: number;
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
                "table-entry",
                props.seen && "seen",
                props.style,
            )}
            onClick={props.onClick}
        >
            
            {props.children}
            <p className="table-entry-text">
                {stringL}
                <b className="bg-blue-500 font-medium text-white">
                    {stringM}
                </b>
                {stringR}
            </p>
        </div>
    )
}