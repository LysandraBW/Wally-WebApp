import { ReactNode } from "react";
import { InputState } from "./useForm/Input";

export type Value = string;
export type Label = string;
export type Values = Array<Value>;
export type Options = Array<[Value, Label]>;
export type OptionsWithNode = Options|Array<[Value, Label, ReactNode]>;
export type OptionMap = {[value: Value]: Label};

export interface ReadInputProps {
    name: string;
    label?: string;
    state?: InputState;
    onBlur?: () => void;
}

export interface ReadWriteInputProps extends ReadInputProps {
    value: Value;
    onChange: (name: string, value: Value) => void;
}

export interface ReadWriteArrayInputProps extends ReadInputProps {
    values: Values;
    options: Options;
    onChange: (name: string, values: Values) => void;
}