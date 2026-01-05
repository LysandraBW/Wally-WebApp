import clsx from "clsx";
import ButtonProps from "./ButtonProps";

export default function PrimaryButton(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                "text-white font-medium",
                "bg-gradient-to-b  border ",
                "",
                "shadow-sm dark:shadow-blue-700/30",                
                "transition-all",
                "relative z-[1] group",
                "after:absolute after:w-[calc(100%)] after:h-[calc(100%)] after:top-[0px] after:left-[0px] after:bg-gradient-to-b  after:rounded-[5px] after:z-[-2] after:transition-all",
                "before:absolute before:w-[calc(100%-1px)] before:h-[calc(100%-1px)] before:top-[0.5px] before:left-[0.5px] before:bg-gradient-to-b  before:rounded-[4.5px] before:z-[-1] before:transition-all",
                props.className,
                !props.disabled && `
                    hover:from-blue-600 hover:to-blue-700 hover:border-blue-700
                    hover:before:!from-blue-600 hover:before:!to-blue-700
                    from-blue-500 to-blue-600 border-blue-600
                    after:from-blue-100 after:to-blue-600
                    before:from-blue-500 before:to-blue-600
                `,
                props.disabled && `
                    cursor-default
                    from-white to-base-100 border-base-300
                    after:from-white after:to-base-100
                    before:from-base-50 before:to-base-100
                    !text-base-400
                `
            )}
            id={props.id}
        >
            {props.children}
        </button>
    )
}