import clsx from "clsx";
import CrossIcon from "../Icon/Cross";

export enum Style {Error};

interface InlineMessageProps {
    style: Style;
    message: string;
    closeMessage: () => void;
}

export default function InlineMessage(props: InlineMessageProps) {
    const style = {
        [Style.Error]: {
            "container": "bg-red-200",
            "closeButton": `
                !fill-red-500 
                !stroke-red-500 
                hover:!bg-red-300
            `,
            "text": "text-red-500"
        }
    };

    return (
        <div 
            className={clsx(
                "rounded flex gap-1 items-center p-1", 
                style[props.style].container
            )}
        >
            <button
                onClick={props.closeMessage}
                className={clsx(
                    "icon !bg-transparent",
                    style[props.style].closeButton
                )}
            >
                <CrossIcon
                    width="16"
                    height="16"
                    fill="inherit"
                    stroke="inherit"
                    strokeWidth="0.5"
                    cursor="pointer"
                />
            </button>
            <span 
                className={clsx(
                    "font-medium",
                    style[props.style].text
                )}
            >
                {props.message}
            </span>
        </div>
    )
}