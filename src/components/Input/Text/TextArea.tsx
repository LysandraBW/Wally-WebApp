"use client";
import { Input } from "../Input";
import { WriteInputProps } from '../../mutate_input';

interface TextAreaProps extends WriteInputProps {
    rows?: number;
    cols?: number;
}

export default function TextArea(props: TextAreaProps) {
    return (
        <Input
            label={props.label}
            input={
                <textarea
                    name={props.name}
                    value={props.selectedValues || ""}
                    onBlur={() => {
                        props.onBlur && props.onBlur();
                    }}
                    onChange={event => {
                        const {name, value} = event.target;
                        props.onChange && props.onChange(name, value);
                    }}
                    rows={props.rows}
                    cols={props.cols}
                />
            }
            state={props.state || {state: false, message: ''}}
        />
    )
}