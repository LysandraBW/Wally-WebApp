"use client";
import { useEffect, useState } from "react";
import { Field } from "../Field";
import { TextProps } from "./TextProps";

export default function Text(props: TextProps) {
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (showErrorMessage)
            return;
        if (props.state && props.state[0] === false && !props.value.length)
            setShowErrorMessage(true)
    }, [props.state, props.value]);

    const onChange = (event: any) => {
        props.onChange(event.target.name, event.target.value);
    }

    const onBlur = (event: any) => {
        setShowErrorMessage(true);
        props.onBlur && props.onBlur();
    }

    return (
        <Field
            label={props.label}
            state={showErrorMessage ? props.state : [null, ""]}
            wrapLabel={true}
            input={
                <input
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={props.placeholder}
                    className="field-hover field-border field-background field-padding field-border field-focus field-text !cursor-auto"
                />
            }
        />
    )
}