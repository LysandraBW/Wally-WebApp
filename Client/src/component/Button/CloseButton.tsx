import clsx from "clsx";
import XMarkIcon from "../Icon/Icons/XMarkIcon";
import IconButton, { IconButtonProps } from "./IconButton";

export default function CloseButton(props: IconButtonProps) {
    return (
        <IconButton
            size={props.size}
            roundedFull={true}
            onClick={props.onClick}
        >
            <XMarkIcon
                class={clsx(
                    "stroke-[2.5px]",
                    (props.size === 3 || !props.size) && "w-[14px] h-[14px]",
                    props.size === 2 && "w-[10px] h-[10px]",
                    props.size === 1 && "w-[6px] h-[6px]"
                )}
            />
        </IconButton>
    )
}