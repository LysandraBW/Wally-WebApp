import { ReadWriteArrayInputProps } from "@/features/Form/DEF";

export interface SelectProps extends ReadWriteArrayInputProps {
    disabled: boolean;
    toggleLabel: string;
}