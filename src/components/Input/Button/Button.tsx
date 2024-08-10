import { DMSans, Inter } from "@/public/Font/Font";
import clsx from "clsx";

interface ButtonProps {
    label: string;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button 
            onClick={() => props.onClick()}    
            className={clsx(
                Inter.className,
                'dark-gradient text-white'
            )}
        >{props.label}</button>
    )
}