'use client';
import { Input, WriteInputProps } from '../Input';

interface TextProps extends WriteInputProps {
    type?: string;
}

export default function Text(props: TextProps) {
    return (
        <Input
            label={props.label}
            input={
                <input
                    name={props.name}
                    type={props.type || 'text'}
                    value={props.value || ''}
                    onBlur={() => {
                        props.onBlur && props.onBlur();
                    }}
                    onChange={event => {
                        const {name, value} = event.target;
                        props.onChange && props.onChange(name, value);
                    }}
                />
            }
            state={props.state || {state: false, message: ''}}
        />
    )
}