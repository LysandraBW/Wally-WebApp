"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface TableEntryProps {
    entry: string;
    search: string;
    style?: string;
}

export default function TableEntry(props: TableEntryProps) {
    const [stringL, setStringL] = useState(props.entry);
    const [stringM, setStringM] = useState("");
    const [stringR, setStringR] = useState("");

    useEffect(() => {
        if (!props.search) {
            setStringL(props.entry);
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
        <td 
            className={clsx(
                "px-2 py-0 min-w-[200px]",
                "whitespace-nowrap",
                "border-r border-r-gray-200 group-hover:border-r-blue-300", 
                props.style
            )}
        >
            <p className="text-gray-700 text-02 group-hover:text-white group-hover:font-medium">
                {stringL}
                <b>{stringM}</b>
                {stringR}
            </p>
        </td>
    )
}