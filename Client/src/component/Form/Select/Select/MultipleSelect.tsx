"use client";
import { useEffect, useState } from "react";
import { SelectProps } from "../DEF";
import { OptionMap } from "@/features/Form/DEF";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import toggleValue from "@/features/Form/helpers/toggleValue";
import Log from "../Log";
import Toggle from "../Toggle";
import List from "../List";
import { Field } from "../../Field";

export default function MultipleSelect(props: SelectProps) {
    const [open, setOpen] = useState(false);
    const [valueToLabel, setValueToLabel] = useState<OptionMap>({});

    useEffect(() => {
        setValueToLabel(getValuesToLabels(props.options));
    }, [props.options]);

    const toggle = (value: string) => {
        const updatedValue = toggleValue(props.values, value); 
        props.onChange(props.name, updatedValue);
    }

    const openList = () => {
        if (props.disabled)
            return;
        setOpen(true);
    }

    const closeList = (event: any): void => {
        if (event.currentTarget.contains(event.relatedTarget))
            return;
        setOpen(false);
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
                    className="relative h-[36px]"
                >
                    <Toggle
                        open={open}
                        style={props.values.length ? "pl-1" : ""}
                        multiple={true}
                        label={(
                            <Log
                                values={props.values}
                                valueToLabel={valueToLabel}
                                deleteValue={toggle}
                                defaultLabel={props.toggleLabel}
                            />
                        )}
                    />
                    {open &&
                        <List
                            values={props.values}
                            options={props.options}
                            multiple={true}
                            selectValue={toggle}
                        />
                    }
                </div>
            }
        />
    )
}