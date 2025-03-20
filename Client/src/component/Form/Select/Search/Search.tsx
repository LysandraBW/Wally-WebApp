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
            console.log("Close");
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
                        console.log("Close");
                        setOpen(false);
                    }}
                    className="h-10"
                >
                    <div
                        className={clsx(   
                            open && "hidden",       
                            "field grid grid-cols-[auto_13px] h-full shadow-sm",
                            "gap-3 justify-between items-center pr-3"
                        )}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            console.log("Open");
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
                        <ul className="px-0 relative top-[0.25rem] field bg-white max-h-[200px] overflow-y-scroll w-full scroll-hide">
                            {matched.map(([value, label], i) => (
                                <li
                                    key={i}
                                    onClick={(event) => {
                                        selectValue(value);
                                    }}
                                    className={clsx(
                                        "px-3 py-1.5 flex justify-between items-center gap-2",
                                        "hover:bg-gray-100 hover:cursor-pointer",
                                    )}
                                >
                                    {label}
                                    
                                </li>
                            ))}
                        </ul>
                    </>
                }
                </div>
            }
        />
    )
}