import clsx from "clsx";
import CrossIcon from "../Icon/Icons/XMark";

export enum Style {Error};

interface InlineMessageProps {
    style: Style;
    message: string;
    closeMessage: () => void;
}

export default function InlineMessage(props: InlineMessageProps) {
    const style = {
        [Style.Error]: {
            "container": "bg-red-100/0 border border-red-300",
            "closeButton": `
                !fill-red-500 
                !stroke-red-500 
                bg-none
                hover:!bg-red-100
            `,
            "text": "text-red-500 border-l-red-400"
        }
    };

    return (
        <div 
            className={clsx(
                "rounded-lg flex gap-1 items-center p-1", 
                style[props.style].container
            )}
        >
            <button
                onClick={props.closeMessage}
                className={clsx(
                    "icon !bg-transparent !rounded-md",
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
                    "text-03 font-medium tracking-wide border-l pl-2",
                    style[props.style].text
                )}
                // style={{lineHeight: "1.25rem"}}
            >
                {props.message}
            </span>
        </div>
    )
}