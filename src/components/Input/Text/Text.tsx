'use client';
import clsx from 'clsx';
import { Input } from '../Input';
import { WriteInputProps } from '../MutateInput';

interface TextProps extends WriteInputProps {
    type: string;
}

export default function Text(props: TextProps) {
    const blurHandler = () => {
        if (props.onBlur)
            props.onBlur();
    }

    const changeHandler = (event: any) => {
        const {name, value} = event.target;
        if (props.onChange)
            props.onChange(name, value);
    }

    return (
        <Input
            label={props.label}
            input={
                <input
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    onBlur={blurHandler}
                    onChange={changeHandler}
                    className={clsx(
                        'w-full',
                        !props.state.state && '!border-red-300 !text-red-300'
                    )}
                />
            }
            state={props.state}
        />
    )
}