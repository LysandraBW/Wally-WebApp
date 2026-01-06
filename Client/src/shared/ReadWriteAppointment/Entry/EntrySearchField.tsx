"use client";

import { SelectProps } from "@/component/Form/Select/SelectProps";
import CheckIcon from "@/component/Icons/Icons/CheckIcon";
import { Value } from "@/features/Form/DEF";
import searchLabels from "@/features/Form/helpers/searchLabels";
import clsx from "clsx";
import { useState, useEffect, Fragment } from "react";
import ChevronUpDownIcon from "@/component/Icons/Icons/ChevronUpDownIcon";
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import EntryField from "@/shared/ReadWriteAppointment/Entry/EntryField";

export default function EntrySearchField(props: SelectProps) {
    const ref = useRef<any>(null);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [matched, setMatched] = useState(props.options ? props.options.slice(0, 10) : []);

    useEffect(() => {
        if (props.values?.[0]) {
            setOpen(false);
        }
    }, [props.values]);
    
    useEffect(() => {
        const matched = searchLabels(search, props.options);
        setMatched(matched);
    }, [open, search]);

    const openList = (event: any) => {
        event.preventDefault();
        setOpen(true);
    }

    const closeList = (event: any): void => {
        setOpen(false);
        setSearch("");
    }

    const selectValue = (value: Value) => {
        props.onChange(props.name, [value]);
    }

    useOnClickOutside(ref, closeList)

    return (
        <EntryField
            label={props.label}
            state={props.state}
            input={
                <div 
                    className={clsx(
                        "max-h-[200px] overflow-y-scroll scroll-hide"
                    )}
                >
                    {!open && 
                        <div
                            tabIndex={0}
                            onMouseDown={openList}
                            className={clsx(
                                "h-full px-2 py-2",
                                "flex justify-between items-center",
                                "hover:cursor-pointer hover:bg-base-50",
                                open && "!bg-blue-50 !text-blue-500"
                            )}
                        >
                            <span
                                className={clsx(
                                    "text-xs text-base-700 font-medium",
                                    "tracking-wide"
                                )}
                            >
                                {props.values?.[0] ? props.values[0] : props.toggleLabel}
                            </span>
                            <ChevronUpDownIcon
                                className="size-3 stroke-[0.5px] stroke-base-500"
                            />
                        </div>
                    }
                    {open &&
                        <div 
                            tabIndex={0}
                            ref={ref}
                            className={clsx(
                                "h-[180px] relative",
                                "after:fixed after:block after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white"
                            )}
                        >
                            <input
                                className={clsx(
                                    "w-full px-2 py-2",
                                    "sticky top-0",
                                    "text-xs text-base-700 tracking-wide",
                                    "bg-base-0 dark:bg-base-50",
                                    "border-b border-base-200",
                                    "outline-none focus:bg-base-100 dark:focus:bg-gray-800/10 focus:text-blue-500",
                                    search && "font-medium"
                                )}
                                value={search} 
                                placeholder="Search" 
                                onChange={(event) => setSearch(event.target.value)}
                            />
                            {matched.map(([value, label], i) => (
                                <li
                                    key={i}
                                    onClick={(event) => selectValue(value)}
                                    className={clsx(
                                        "px-2 py-2",
                                        "flex items-center justify-between gap-2",
                                        "bg-base-0 dark:bg-base-50 border-t border-base-200 [&:nth-child(2)]:border-t-0 last:border-b cursor-pointer",
                                        "hover:bg-base-100 dark:hover:bg-gray-800/10",
                                        props.values.includes(value) && "bg-blue-50"
                                    )}
                                >
                                    <span 
                                        className={clsx(
                                            "text-base-500 text-xs tracking-wide", 
                                            props.values.includes(value) && "font-medium text-blue-500"
                                        )}
                                    >
                                        {label}
                                    </span>
                                    {props.values.includes(value) &&
                                        <CheckIcon
                                            className="size-3 stroke-blue-500 stroke-[3px]"
                                        />
                                    }
                                </li>
                            ))}
                        </div>
                    }
                </div>
            }
        />
    )
}