'use client';
import { InputState } from "@/hook/State/Interface";
import Error from './Error/Error';

// Props for Inputs Only to be Read
export interface ReadInputProps {
    name: string;
    label: string;
    state?: InputState;
    onBlur?: () => void;
    onChange?: (name: string, value: any) => void;   
}

// Props for Inputs to be Written and Read
export interface WriteInputProps extends ReadInputProps {
    value: any;
}

// Props for Input Component
export interface InputProps {
    input: React.ReactNode;
    label: string;
    state: InputState;
}

export function Input({label, input, state}: InputProps) {
    return (
        <div>
            <label>
                {label}
            </label>
            <div>
                {input}
            </div>
            <Error
                state={state}
            />
        </div>
    );
}