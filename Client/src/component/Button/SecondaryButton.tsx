import clsx from "clsx";
import ButtonProps from "./ButtonProps";

export default function SecondaryButton(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                "text-base-700 font-medium",
                "bg-gradient-to-b from-base-0 to-base-100 border border-base-300 dark:!border-[#141414]",
                "hover:from-base-100 hover:to-base-200 hover:border-base-300 dark:hover:!border-base-50",
                "shadow-sm",                
                "transition-all",
                "relative z-[1] group",

                "after:absolute after:w-[calc(100%)] after:h-[calc(100%)] after:top-[0px] after:left-[0px] after:bg-gradient-to-b after:rounded-[5px] after:z-[-2] after:transition-all",
                "after:from-white/50 after:to-white/0 hover:after:!from-white/100",
                "dark:after:from-white/30 dark:after:to-white/0 dark:hover:after:!from-white/20",
                
                "before:absolute before:w-[calc(100%-1px)] before:h-[calc(100%-1px)] before:top-[0.5px] before:left-[0.5px] before:rounded-[4.5px] before:z-[-1] before:transition-all before:bg-gradient-to-b",
                "before:from-base-50 before:to-base-100 hover:before:!from-base-100 hover:before:!to-base-200",
                "dark:before:from-[#1F1F1F] dark:before:to-[#141414] dark:hover:before:!from-[#141414] dark:hover:before:!to-base-50",

                props.className
            )}
        >
            {props.children}
        </button>
    )
}