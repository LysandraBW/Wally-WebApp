import { StateType } from "./input/Error";

export default interface ReadInputProps {
    name: string;
    label: string;
    state: StateType;
    onBlur?: () => void;
    onChange?: (name: string, value: any) => void;
}