"use client";
import { WriteInputProps } from '../../MutateInput';
import { useState, useEffect } from "react";
import { DropdownFrame } from "../Frame";
import { getToggleLabel } from "@/lib/Input/Dropdown/ToggleLabel";

export interface DropdownProps<T> extends WriteInputProps {
    value: Array<T>;
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
            value: props.value,
            values: props.values
        }));
    }, [...props.value]);

    return (
        <DropdownFrame
            name={props.name}
            state={props.state}
            label={props.label}
            defaultLabel={props.defaultLabel}
            value={props.value}
            values={props.values}
            open={open}
            toggleDropdown={setOpen}
            multiple={props.multiple}
            disabled={props.disabled}
            onBlur={props.onBlur}
            onChange={props.onChange}
        >
            <div onClick={() => !props.disabled && setOpen(!open)}>
                {toggleLabel}
            </div>
        </DropdownFrame>
    )
}