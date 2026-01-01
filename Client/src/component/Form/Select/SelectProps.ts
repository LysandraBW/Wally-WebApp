import { Options, ReadWriteArrayInputProps } from "@/features/Form/DEF";
import { ReactNode } from "react";

export interface SelectProps extends Omit<ReadWriteArrayInputProps, "options"> {
    options: Options;
    toggleLabel: string;
    ToggleIcon?: ReactNode;
    ListHeader?: React.ComponentType<{ children?: React.ReactNode; }>;
    CheckedIcon?: ReactNode;
    NotCheckedIcon?: ReactNode;
    disabled: boolean;
    multiple?: boolean;
}