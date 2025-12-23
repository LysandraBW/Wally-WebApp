import clsx from "clsx";
import XMarkIcon from "../Icons/Icons/XMarkIcon";
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
                    "stroke-[3px]",
                    (props.size === 3 || !props.size) && "w-[14px] h-[14px]",
                    props.size === 2 && "w-[8px] h-[8px]",
                    props.size === 1 && "w-[6px] h-[6px]"
                )}
            />
        </IconButton>
    )
}