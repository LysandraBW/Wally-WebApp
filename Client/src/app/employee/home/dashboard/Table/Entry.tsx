"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface TableEntryProps {
    entry: string;
    search: string;
    style?: string;
    isNew?: boolean;
}

export default function TableEntry(props: TableEntryProps) {
    const [stringL, setStringL] = useState(props.entry || "N/A");
    const [stringM, setStringM] = useState("");
    const [stringR, setStringR] = useState("");

    useEffect(() => {
        if (!props.search || !props.entry) {
            setStringL(props.entry || "N/A");
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
                "px-2 py-0 min-w-[200px] max-w-[200px]",
                "border-r border-r-gray-300",
                props.style
            )}
        >
            <div className="w-full h-full whitespace-nowrap flex gap-2 items-center overflow-clip">
                {props.isNew &&
                    <span className="bg-blue-600 text-white border border-blue-500 shadow-sm  tracking-wider font-semibold text-[0.4rem] py-[1px] px-[4px] rounded">NEW</span>
                }
                <p className="w-min text-gray-700 tracking-wider text-02 whitespace-nowrap group-hover:text-blue-500 overflow-hidden text-ellipsis">
                    {stringL}
                    <b>{stringM}</b>
                    {stringR}
                </p>
            </div>
        </td>
    )
}