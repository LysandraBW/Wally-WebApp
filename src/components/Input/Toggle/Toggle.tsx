'use client';
import { WriteInputProps } from "../Input";

interface ToggleProps extends WriteInputProps {
    value: number;
}

export default function Toggle(props: ToggleProps) {
    return (
        <span
            onClick={() => {
                props.onChange && props.onChange(props.name, 1 - props.value);
            }}
        >
            {props.value ? 'Y' : 'N'}
        </span>
    )
}