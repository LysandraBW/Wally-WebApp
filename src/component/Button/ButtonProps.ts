import { ReactNode } from "react";

export default interface ButtonProps {
    onClick: () => void;
    id?: string;
    children?: ReactNode;
    disabled?: boolean;
    className?: string;
}