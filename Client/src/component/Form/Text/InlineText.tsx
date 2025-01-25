"use client";
import clsx from "clsx";
import { Field } from "../Field";
import { TextProps } from "./DEF";

export default function InlineText(props: TextProps) {
    const onChange = (event: any) => {
        props.onChange(event.target.name, event.target.value);
    }

    return (
        <Field
            label={props.label}
            state={props.state}
            input={
                <input
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    onBlur={props.onBlur}
                    onChange={onChange}
                    placeholder={props.placeholder}
                    className={clsx(
                        "field !shadow-none !rounded-none",
                        "!border-none !outline-none",
                        props.style
                    )}
                />
            }
        />
    )
}