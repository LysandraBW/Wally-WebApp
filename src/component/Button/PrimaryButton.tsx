import clsx from "clsx";
import ButtonProps from "./ButtonProps";

export default function PrimaryButton(props: ButtonProps) {
    return (
        <button
            onClick={() => !props.disabled && props.onClick()}
            className={clsx(
                "text-white font-medium",
                "shadow-sm",
                "transition-all before:transition-all",
                "relative z-[1] group",
                // Border
                "border border-blue-600",
                // Inner Border
                "bg-gradient-to-b",
                "from-blue-100 to-blue-600",
                // Background
                "before:rounded-[4.5px]",
                "before:w-[calc(100%-1px)] before:h-[calc(100%-1px)]",
                "before:absolute before:top-[0.5px] before:left-[0.5px] before:z-[-1] ",
                "before:bg-gradient-to-b",
                "before:from-blue-500 before:to-blue-600",
                props.className,
                !props.disabled && `
                    dark:shadow-blue-700/30
                    hover:border-blue-700
                    hover:before:from-blue-600 hover:before:to-blue-700
                `,
                props.disabled && `
                    cursor-default
                    !border-base-300 dark:!border-base-200

                    !from-white !to-base-100
                    before:!from-base-50 before:!to-base-100
                    
                    dark:!from-base-400 dark:!to-base-0
                    dark:before:!from-[#121315] dark:before:!to-base-50
                    
                    !text-base-400
                    
                `
            )}
            id={props.id}
        >
            {props.children}
        </button>
    )
}