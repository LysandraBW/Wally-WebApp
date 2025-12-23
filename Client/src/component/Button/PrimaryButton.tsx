import clsx from "clsx";
import ButtonProps from "./ButtonProps";

export default function PrimaryButton(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                "text-white font-medium",
                "bg-blue-500 border border-blue-500",
                "hover:bg-blue-600 hover:border-blue-600",
                "shadow-sm dark:shadow-blue-700/30",                
                "transition-all",
                props.class
            )}
        >
            {props.children}
        </button>
    )
}