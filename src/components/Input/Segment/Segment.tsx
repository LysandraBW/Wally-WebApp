"use client";
import { Input, WriteInputProps } from "../Input";

interface SegmentProps<T> extends WriteInputProps {
    value: T;
    values: Array<[T, string]>;
}

export default function Segment(props: SegmentProps<any>) {
    return (
        <Input
            label={props.label}
            input={
                <>
                    {props.values.map(([value, label], i) => (
                        <div 
                            key={i}
                            onClick={() => {
                                props.onChange && props.onChange(props.name, value);
                            }}>
                            {value === props.value ? label.toUpperCase() : label.toLowerCase()}
                        </div>
                    ))}
                </>
            }
            state={props.state || {state: false, message: ''}}
        />
    )
}