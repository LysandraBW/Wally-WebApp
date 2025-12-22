"use client";
import { Field } from "../Field";
import { TextProps } from "./DEF";

export default function Text(props: TextProps) {
    const onChange = (event: any) => {
        props.onChange(event.target.name, event.target.value);
    }

    return (
        <Field
            label={props.label}
            state={props.state}
            wrapLabel={true}
            input={
                <input
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    onBlur={props.onBlur}
                    onChange={onChange}
                    placeholder={props.placeholder}
                    className="surface clickable field field-text !cursor-auto border"
                />
            }
        />
    )
}