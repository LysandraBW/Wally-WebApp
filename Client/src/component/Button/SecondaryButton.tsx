import clsx from "clsx";
import ButtonProps from "./ButtonProps";

export default function SecondaryButton(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                "surface surface-hover surface-border shadow-sm",
                "text-base-700 font-medium hover:text-base-900",
                "transition-all",
                props.class
            )}
        >
            {props.children}
        </button>
    )
}