"use client";
import { useEffect, useState } from "react";
import { OptionMap } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import toggleValue from "@/features/Form/helpers/toggleValue";
import { Field } from "@/component/Form/Field";
import { SelectProps } from "@/component/Form/Select/DEF";
import ExpandIcon from "@/component/Icon/Icons/ChevronUpDownIcon";

export default function CalendarSelect(props: SelectProps) {
    const [open, setOpen] = useState(false);
    const [valueToLabel, setValueToLabel] = useState<OptionMap>({});

    useEffect(() => {
        setValueToLabel(getValuesToLabels(props.options));
    }, [props.values]);

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
        const updatedValue = toggleValue(props.values, value); 
        props.onChange(props.name, updatedValue);
    }

    return (
        <Field
            label={props.label}
            state={props.state}
            input={
                <div
                    tabIndex={0}
                    onBlur={closeList}
                    onClick={openList}
                    className="relative"
                >
                    <button className="tracking-wide text-xs text-black bg-white flex px-2 py-1 justify-between items-center w-full rounded border border-gray-300 shadow-sm">
                        {valueToLabel[props.values[0]] || props.toggleLabel}
                        <ExpandIcon
                            stroke="#1F2937"
                        />
                    </button>
                    {open &&
                        <ul className="absolute top-[calc(100%+0.5rem)] bg-white rounded-md w-full border border-gray-300 shadow-sm">
                            {props.options.map(([value, label], i) => (
                                <li 
                                    key={i} 
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        selectValue(value);
                                        setOpen(false);
                                    }}
                                    className="w-full px-4 py-1 first:rounded-t-lg last:rounded-b-lg tracking-wide text-xs text-black hover:bg-gray-50 cursor-pointer"
                                >
                                    {label}
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            }
        />
    )
}