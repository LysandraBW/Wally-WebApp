export interface InputStateType {
    state: boolean;
    message: string;
}

export const DefaultInputState: InputStateType = {
    state: true,
    message: ''
}

export interface ReadInputProps {
    name: string;
    label: string;
    state: InputStateType;
    onBlur?: null | (() => void);
    onChange?: (name: string, value: any) => void;
}

export interface WriteInputProps extends ReadInputProps {
    value: any;
}