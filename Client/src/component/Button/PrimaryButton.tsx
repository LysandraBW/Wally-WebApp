import clsx from "clsx";
import ButtonProps from "./ButtonProps";

export default function PrimaryButton(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                "text-white font-medium",
                "bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-600",
                "hover:from-blue-600 hover:to-blue-700 hover:border-blue-700",
                "shadow-sm dark:shadow-blue-700/30",                
                "transition-all",
                "relative z-[1] group",
                "after:absolute after:w-[calc(100%)] after:h-[calc(100%)] after:top-[0px] after:left-[0px] after:bg-gradient-to-b after:from-white/30 after:to-white/0 after:rounded-[5px] after:z-[-2] after:transition-all",
                "before:absolute before:w-[calc(100%-2px)] before:h-[calc(100%-1px)] before:top-[1px] before:left-[1px] before:bg-gradient-to-b before:from-blue-500 before:to-blue-600 hover:before:!from-blue-600 hover:before:!to-blue-700 before:rounded-[5px] before:z-[-1] before:transition-all",
                props.className
            )}
            id={props.id}
        >
            {props.children}
        </button>
    )
}