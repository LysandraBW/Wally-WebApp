"use client";

export interface ReadInputProps {
    name: string;
    label: string;
    error?: {
        state: boolean, 
        message: string
    };
    onBlur?: () => void;
    onChange?: (name: string, value: any) => void;   
}

export interface WriteInputProps extends ReadInputProps {
    value: any;
}

export function Input({label, input}: {
    input: React.ReactNode;
    label: string;
}) {
    return (
        <div>
            <label>
                {label}
            </label>
            <div>
                {input}
            </div>
        </div>
    )
}