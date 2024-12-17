"use client";
import { WriteInputProps } from '../mutate_input';
import { useState, useEffect } from "react";
import { DropdownFrame } from "./DropdownFrame";
import { getToggleLabel } from "@/lib/input/dropdown/toggle_label";

export interface DropdownProps<T> extends WriteInputProps {
    selectedValues: Array<T>;
    values: Array<[T, string]>;
    multiple?: boolean;
    disabled?: boolean;
    defaultLabel: string;
}

export default function Dropdown(props: DropdownProps<any>) {
    const [open, setOpen] = useState(false);
    const [toggleLabel, setToggleLabel] = useState(props.defaultLabel);

    useEffect(() => {
        setToggleLabel(getToggleLabel({
            multiple: props.multiple,
            defaultLabel: props.defaultLabel,
            value: props.selectedValues,
            values: props.values
        }));
    }, [...props.selectedValues]);

    return (
        <DropdownFrame
            name={props.name}
            values={props.values}
            selectedValues={props.selectedValues}
            state={props.state}
            label={props.label}
            defaultLabel={props.defaultLabel}
            open={open}
            toggleDropdown={setOpen}
            multiple={props.multiple}
            disabled={props.disabled}
            onBlur={props.onBlur}
            onChange={props.onChange}
        >
            <div 
                onClick={() => !props.disabled && setOpen(!open)}
            >
                {toggleLabel}
            </div>
        </DropdownFrame>
    )
}