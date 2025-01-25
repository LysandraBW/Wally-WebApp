import { ReadWriteInputProps } from "@/features/Form/DEF";

export interface TextProps extends ReadWriteInputProps {
    type?: string;
    placeholder?: string;
    style?: string;
}