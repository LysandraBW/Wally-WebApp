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
                    className={[
                        'border rounded border-gray-300 px-[8px] py-[4px] bg-white w-full',
                        `${props.state && !props.state.state && '!border-[#DA1C1C] !bg-[#DA1C1C] !bg-opacity-[12%]'}`
                    ].join(' ')}
                />
            }
            state={props.state || {state: true, message: ''}}
        />
    )
}