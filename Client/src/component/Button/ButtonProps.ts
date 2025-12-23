import { ReactNode } from "react";

export default interface ButtonProps {
    onClick: () => void;
    children?: ReactNode;
    disabled?: boolean;
    class?: string;
}