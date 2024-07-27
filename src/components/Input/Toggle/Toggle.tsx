'use client';
import { WriteInputProps } from "../Input";

interface ToggleProps extends WriteInputProps {
    value: number;
}

export default function Toggle(props: ToggleProps) {
    return (
        <div onClick={() => props.onChange && props.onChange(props.name, 1 - props.value)}>
            <label>{props.label}</label>
            <span>{props.value ? 'Y' : 'N'}</span>
        </div>
    )
}