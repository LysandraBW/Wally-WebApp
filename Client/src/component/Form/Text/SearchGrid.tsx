"use client";

import { SelectProps } from "@/component/Form/Select/SelectProps";
import CheckIcon from "@/component/Icons/Icons/CheckIcon";
import { Value } from "@/features/Form/DEF";
import searchLabels from "@/features/Form/helpers/searchLabels";
import clsx from "clsx";
import { useState, useEffect, Fragment } from "react";


export default function SearchGrid(props: SelectProps) {
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

    const openList = (event: any) => {
        event.preventDefault();
        // console.log("Open");
        setOpen(true);
    }

    const closeList = (event: any): void => {
        if (event.currentTarget.contains(event.relatedTarget))
            return;
        // console.log("Close");
        setOpen(false);
        // setOpen(false);
        // setSearch("");
    }

    const selectValue = (value: Value) => {
        props.onChange(props.name, [value]);
    }

    return (
        <Fragment>
            <tr className="max-h-[32px] p-0">
                <td className="p-0 text-c-enter bg-white w-[150px] font-medium px-4 text-02 text-gray-700 tracking-wide border-b border-gray-300">{props.label}</td>
                <td className="p-0 border-l border-b border-gray-300">
                    <table className="w-full border-0 border-collapse">
                        <tbody>
                            <tr>
                                {!open &&
                                    <td className="p-0">
                                        <div
                                            tabIndex={0}
                                            onBlur={closeList}
                                            className="relative h-[32px]"
                                        >
                                            <div 
                                                onMouseDown={openList}
                                                className={clsx("grid grid-cols-[auto_13px] h-full gap-3 justify-between items-center px-4 pr-4 cursor-pointer hover:bg-gray-50 tracking-wide text-02 text-gray-700", open && "!bg-blue-50 !text-blue-500")}
                                            >
                                                {props.values[0] ? props.values[0] : props.toggleLabel}
                                            </div>
                                        </div>
                                    </td>
                                }
                                {open &&
                                    <td className="p-0">
                                        <input 
                                            className="focus:bg-blue-50 focus:text-blue-500 text-02 text-gray-700 tracking-wider px-4 outline-none w-full h-[36px]"
                                            value={search} 
                                            placeholder="Search" 
                                            onChange={(event) => setSearch(event.target.value)}
                                        />
                                    </td>
                                }
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            {open &&
                <tr className="">
                    <td className="p-0"></td>
                    <td className="p-0 border border-gray-300 ">
                        <ul className="bg-white w-full max-h-[200px] overflow-y-scroll">
                            {matched.map(([value, label], i) => (
                                <li
                                    key={i}
                                    onClick={(event) => selectValue(value)}
                                    className="bg-gray-50 flex items-center justify-between px-4 py-2 last:border-b-0 cursor-pointer hover:bg-gray-100"
                                >
                                    <span className={clsx("text-gray-600 text-sm tracking-wide", props.values.includes(value) && "font-medium text-gray-950")}>
                                        {label}
                                    </span>
                                    {props.values.includes(value) &&
                                        <CheckIcon/>
                                    }
                                </li>
                            ))}
                        </ul>
                    </td>
                </tr>
            }
            {(props.state && props.state[0] === false) &&
                <tr className="min-h-[24px] p-0 bg-red-100/50">
                    <td className="p-0 border border-gray-300 bg-gray-50 w-[150px] px-4"></td>
                    <td className="p-0 border border-gray-300 px-4 py-1 text-red-500 font-medium tracking-wide text-01">
                        '{JSON.stringify(props.state)}'
                    </td>
                </tr>
            }
        </Fragment>
    )
}