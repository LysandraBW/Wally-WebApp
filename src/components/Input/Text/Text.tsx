"use client";
import { Input, WriteInputProps } from "../Input";

export default function Text(props: WriteInputProps) {
    return (
        <Input
            label={props.label}
            input={
                <input
                    name={props.name}
                    type="text"
                    value={props.value || ""}
                    onBlur={() => {
                        props.onBlur && props.onBlur();
                    }}
                    onChange={event => {
                        const {name, value} = event.target;
                        props.onChange && props.onChange(name, value);
                    }}
                />
            }
        />
    )
}