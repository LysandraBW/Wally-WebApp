import clsx from "clsx";
import ButtonProps from "./_DEF";

export default function PrimaryButton(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                "bg-blue-500 border border-blue-500",
                "shadow-sm dark:shadow-blue-700/30",
                "text-white font-medium",
                "hover:bg-blue-600 hover:border-blue-600",
                "transition-all",
                props.class
            )}
        >
            {props.children}
        </button>
    )
}