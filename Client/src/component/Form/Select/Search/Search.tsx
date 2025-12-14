"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { SelectProps } from "../DEF";
import { OptionMap, Value } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import searchLabels from "@/features/Form/helpers/searchLabels";
import Toggle from "../Toggle";
import TextField from "../../Text/TextField";
import List from "../List";
import { Field } from "../../Field";
import clsx from "clsx";

export default function Search(props: SelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [matched, setMatched] = useState(props.options.slice(0, 10));

    useEffect(() => {
        if (props.values[0]) {
            // console.log("Close");
            setOpen(false);
        }
    }, [props.values]);
    
    useEffect(() => {
        const matched = searchLabels(search, props.options);
        setMatched(matched);
    }, [open, search]);

    const openList = () => {
        if (props.disabled)
            return;
        setOpen(!open);
    }

    const closeList = (): void => {
        setOpen(false);
        setSearch("");
    }

    const selectValue = (value: Value) => {
        props.onChange(props.name, [value]);
    }
    
    return (
        <Field
            label={props.label}
            state={props.state}
            input={
                <div
                    tabIndex={0}
                    onBlur={(event) => {
                        if (event.currentTarget.contains(event.relatedTarget))
                            return;
                        // console.log("Close");
                        setOpen(false);
                    }}
                    className="h-10"
                >
                    <div
                        className={clsx(   
                            open && "hidden",       
                            "field grid grid-cols-[auto_13px] shadow-sm",
                            "gap-3 justify-between items-center pr-3"
                        )}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            // console.log("Open");
                            setOpen(true);
                        }}
                    >
                        {props.values[0] ? props.values[0] : props.toggleLabel}
                    </div>
                
                {open &&
                    <>
                        <input 
                            className="field" 
                            value={search} 
                            placeholder="Search" 
                            onChange={(event) => {
                                setSearch(event.target.value);
                            }}
                        />
                        {matched.length == 0 &&
                            <ul className={clsx(
                                "px-0 relative top-[0.25rem] field bg-white h-full w-full shadow"
                            )}>
                                <li
                                    className={clsx(
                                        "",
                                        "text-center text-gray-600 text-[0.85rem]",
                                    )}
                                >
                                    No Results
                                </li>
                            </ul>
                        }
                        {matched.length > 0 &&
                            <ul className={clsx(
                                "px-0 relative top-[0.25rem] field bg-white max-h-[200px] overflow-y-scroll w-full shadow",
                                matched.length < 10 && "min-h-[100px]",
                                matched.length < 20 && "min-h-[100px]",
                                matched.length >= 20 && "min-h-[200px]",
                            )}>
                                {matched.map(([value, label], i) => (
                                    <li
                                        key={i}
                                        onClick={(event) => {
                                            selectValue(value);
                                        }}
                                        className={clsx(
                                            "px-3 py-1.5 flex justify-between items-center gap-2",
                                            "hover:bg-gray-100 hover:cursor-pointer text-gray-600",
                                        )}
                                    >
                                        {label}
                                        
                                    </li>
                                ))}
                                {matched.length == 0 &&
                                    <li
                                        className={clsx(
                                            "px-3 py-1.5 ",
                                            "text-center text-gray-600",
                                        )}
                                    >
                                        No Results
                                    </li>
                                }
                            </ul>
                        }
                        {/* <ul className={clsx(
                            "px-0 relative top-[0.25rem] field bg-white max-h-[200px] overflow-y-scroll w-full",
                            matched.length < 10 && "min-h-[100px]",
                            matched.length < 20 && "min-h-[100px]",
                            matched.length >= 20 && "min-h-[200px]",
                        )}>
                            {matched.map(([value, label], i) => (
                                <li
                                    key={i}
                                    onClick={(event) => {
                                        selectValue(value);
                                    }}
                                    className={clsx(
                                        "px-3 py-1.5 flex justify-between items-center gap-2",
                                        "hover:bg-gray-100 hover:cursor-pointer text-gray-600",
                                    )}
                                >
                                    {label}
                                    
                                </li>
                            ))}
                            {matched.length == 0 &&
                                <li
                                    className={clsx(
                                        "px-3 py-1.5 ",
                                        "text-center text-gray-600",
                                    )}
                                >
                                    No Results
                                </li>
                            }
                        </ul> */}
                    </>
                }
                </div>
            }
        />
    )
}