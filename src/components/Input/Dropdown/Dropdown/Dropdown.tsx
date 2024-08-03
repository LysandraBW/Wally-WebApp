"use client";
import { WriteInputProps } from "../../Input";
import { useState, useEffect } from "react";
import { DropdownFrame } from "../Frame";

export interface DropdownProps<T> extends WriteInputProps {
    value: Array<T>;
    values: Array<[T, string]>;
    multiple?: boolean;
    disabled?: boolean;
    defaultLabel: string;
}

export default function Dropdown(props: DropdownProps<any>) {
    const [open, setOpen] = useState(false);
    
    const toggleLabel = () => {
        if (props.multiple)
            return props.defaultLabel;
        
        for (const [value, label] of props.values) {
            if (props.value.includes(value)) {
                return label;
            }
        }
        
        return props.defaultLabel;
    }

    const getToggle = (): React.ReactNode => {
        return (
            <div onClick={() => !props.disabled && setOpen(!open)}>
                {toggleLabel()}
            </div>
        )
    }

    return (
        <DropdownFrame
            open={open}
            setOpen={setOpen}
            name={props.name}
            label={props.label}
            value={props.value}
            values={props.values}
            defaultLabel={props.defaultLabel}
            multiple={props.multiple}
            disabled={props.disabled}
            onBlur={props.onBlur}
            onChange={props.onChange}
            getToggle={getToggle}
            state={props.state}
        />
    )
}