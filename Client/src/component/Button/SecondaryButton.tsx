import clsx from "clsx";
import ButtonProps from "./_DEF";

export default function SecondaryButton(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                "surface clickable border shadow-sm",
                "text-base-700 font-medium hover:text-base-900",
                "transition-all",
                props.class
            )}
        >
            {props.children}
        </button>
    )
}