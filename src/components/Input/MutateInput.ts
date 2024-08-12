export interface InputState {
    state: boolean;
    message: string;
}

export interface ReadInputProps {
    name: string;
    label: string;
    state: InputState;
    onBlur?: null | (() => void);
    onChange?: (name: string, value: any) => void;
}

export interface WriteInputProps extends ReadInputProps {
    value: any;
}