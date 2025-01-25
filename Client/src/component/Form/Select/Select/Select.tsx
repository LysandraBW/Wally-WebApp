"use client";
import { useEffect, useState } from "react";
import { SelectProps } from "../DEF";
import { OptionMap } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import toggleValue from "@/features/Form/helpers/toggleValue";
import Toggle from "../Toggle";
import List from "../List";
import { Field } from "../../Field";

export default function Select(props: SelectProps) {
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
                    <Toggle
                        open={open}
                        multiple={true}
                        label={<p className="px-2 py-1 text-gray-700">{valueToLabel[props.values[0]] || props.toggleLabel}</p>}
                    />
                    {open &&
                        <List
                            values={props.values}
                            options={props.options}
                            multiple={false}
                            selectValue={selectValue}
                        />
                    }
                </div>
            }
        />
    )
}