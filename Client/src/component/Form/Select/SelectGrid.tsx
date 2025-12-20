"use client";

import Checkbox from "@/component/Form/Checkbox/Checkbox";
import { Field } from "@/component/Form/Field";
import { SelectProps } from "@/component/Form/Select/DEF";
import List from "@/component/Form/Select/List";
import ListElement from "@/component/Form/Select/List/ListElement";
import Toggle from "@/component/Form/Select/Toggle";
import CheckIcon from "@/component/Icon/Check";
import ExpandIcon from "@/component/Icon/Expand";
import { OptionMap } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import toggleValue from "@/features/Form/helpers/toggleValue";
import clsx from "clsx";
import { useState, useEffect, Fragment } from "react";


export default function SelectGrid(props: SelectProps) {
    const [open, setOpen] = useState(false);
    const [valueToLabel, setValueToLabel] = useState<OptionMap>({});

    useEffect(() => {
        setValueToLabel(getValuesToLabels(props.options));
    }, [props.options, props.values]);

    const openList = () => {
        if (props.disabled)
            return;
        setOpen(!open);
    }

    const closeList = (event: any): void => {
        if (event.currentTarget.contains(event.relatedTarget))
            return;
        setOpen(false);
    }

    const selectValue = (value: string) => {
        const updatedValue = [value]; 
        // console.log(updatedValue);
        props.onChange(props.name, updatedValue);
    }

    const clickValue = (event: any, value: string) => {
        event.preventDefault();
        event.stopPropagation();
        selectValue(value);
        setOpen(false);
    }

    return (
        <Fragment>
            <tr className="h-[32px] p-0">
                <td className="w-0 p-0 text-c-enter bg-white font-medium px-4 text-03 tracking-wide border-b border-gray-300 align-top pt-1">{props.label}</td>
                <td className="p-0 border-l border-b border-gray-300">
                    <table className="w-full border-0 border-collapse">
                        <tbody>
                            <tr>
                                <td className="p-0">
                                    <div
                                        tabIndex={0}
                                        onBlur={closeList}
                                        onClick={openList}
                                        className="relative"
                                    >
                                        <div className={clsx("grid grid-cols-[auto_13px] h-[32px] gap-3 justify-between items-center px-4 pr-4 cursor-pointer hover:bg-gray-50 text-gray-600", open && "!bg-blue-50 !text-blue-500")}>
                                            <p className="tracking-wide text-03 text-inherit">{valueToLabel[props.values[0]] || props.toggleLabel}</p>
                                            <ExpandIcon
                                                stroke="#1F2937"
                                            />
                                        </div>
                                        {open &&
                                            <ul className="bg-white w-full">
                                                {props.options.map(([value, label], i) => (
                                                    <li
                                                        key={i}
                                                        onClick={(event) => {console.log(1); clickValue(event, value)}}
                                                        className="bg-gray-50 flex items-center justify-between px-4 py-2 border-b border-b-gray-300 last:border-b-0 cursor-pointer hover:bg-gray-100"
                                                    >
                                                        <span className={clsx("text-gray-600 text-sm tracking-wide", props.values.includes(value) && "font-medium text-gray-950")}>
                                                            {label}
                                                        </span>
                                                        {props.values.includes(value) &&
                                                            <CheckIcon
                                                                width="16"
                                                                height="16"
                                                                color="#020617"
                                                            />
                                                        }
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            {(props.state && props.state[0] === false) &&
                <tr className="min-h-[24px] p-0 bg-red-100/50">
                    <td className="p-0 border border-gray-300 bg-gray-50 w-[150px] px-4"></td>
                    <td className="p-0 border border-gray-300 px-4 py-1 text-red-500 font-medium tracking-wide text-01">
                        {props.state[1]}
                    </td>
                </tr>
            }
        </Fragment>
    )
}