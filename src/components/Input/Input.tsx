'use client';
import Error from './Error/Error';
import clsx from "clsx";
import { InputStateType } from './MutateInput';

export interface InputProps {
    input: React.ReactNode;
    label: string;
    state: InputStateType;
}

export function Input(props: InputProps) {
    return (
        <div
            className={clsx(
                'flex flex-col gap-y-2',
                'flex-col-reverse'
            )}
        >
            {!props.state.state &&
                <Error
                    state={props.state}
                />
            }
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