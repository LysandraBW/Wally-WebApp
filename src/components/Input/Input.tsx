'use client';
import { InputState } from "@/hook/State/Interface";
import Error from './Error/Error';
import clsx from "clsx";

export interface InputProps {
    input: React.ReactNode;
    label: string;
    state: InputState;
}

export function Input(props: InputProps) {
    return (
        <div
            className={clsx(
                'flex flex-col gap-y-2',
                'flex-col-reverse'
            )}
        >
            <Error
                state={props.state}
            />
            <div 
                className='peer'
            >
                {props.input}
            </div>
            <label
                className={clsx(
                    'inputLabel',
                    !props.state.state && '!text-red-300'
                )}
            >
                {props.label}
            </label>
        </div>
    );
}

export interface ReadInputProps {
    name: string;
    label: string;
    state: InputState;   
    onChange: null | ((
        name: string, 
        value: any
    ) => void);
    onBlur: null | (() => void);
}

export interface WriteInputProps extends ReadInputProps {
    value: any;
}