import clsx from "clsx";
import ButtonProps from "./ButtonProps";

export default function SecondaryButton(props: ButtonProps) {
    return (
        <button
            onClick={() => !props.disabled && props.onClick()}
            className={clsx(
                "text-base-700 font-medium",
                "shadow-sm",
                "transition-all before:transition-all",
                "relative z-[1] group",
                // Border
                "border border-base-300 dark:border-base-200",
                // Inner Border
                "bg-gradient-to-b",
                "from-white to-base-100",
                "dark:from-base-300 dark:to-base-50",
                // Background
                "before:rounded-[4.5px]",
                "before:w-[calc(100%-1px)] before:h-[calc(100%-1px)]",
                "before:absolute before:top-[0.5px] before:left-[0.5px] before:z-[-1]",
                "before:bg-gradient-to-b",
                "before:from-base-50 before:to-base-100",
                "dark:before:from-[#121315] dark:before:to-base-50",
                props.className,
                props.disabled && `
                    !text-base-400 
                    !cursor-default
                `,
                // DISABLED Inner Border
                props.disabled && "dark:!from-base-300",
                // NOT DISABLED Inner Border
                !props.disabled && "hover:to-base-100 dark:hover:to-base-0",
                // NOT DISABLED Background
                !props.disabled && "hover:before:from-base-0 hover:before:to-base-100 dark:hover:before:from-base-50 dark:hover:before:to-base-0",
            )}
        >
            {props.children}
        </button>
    )
}