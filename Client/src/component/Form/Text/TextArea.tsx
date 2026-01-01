"use client";
import clsx from "clsx";
import { TextProps } from "./TextProps";
import { Field } from "../Field";

export default function TextArea(props: TextProps) {
    const onChange = (event: any) => {
        const {name, value} = event.target;
        props.onChange(name, value);
    }

    return (
        <Field
            label={props.label}
            state={props.state}
            input={
                <textarea
                    name={props.name}
                    value={props.value}
                    onBlur={props.onBlur}
                    onChange={onChange}
                    className={clsx(
                        "field-hover field-background field-padding field-border field-focus field-text"
                    )}
                />
            }
        />
    )
}