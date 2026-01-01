import clsx from "clsx";
import XMarkIcon from "../Icons/Icons/XMarkIcon";
import IconButton, { IconButtonProps } from "./IconButton";

export default function CloseButton(props: IconButtonProps) {
    return (
        <IconButton
            size={props.size}
            paddingLess={props.paddingLess}
            roundedFull={true}
            onClick={props.onClick}
        >
            <XMarkIcon
                className={clsx(
                    "stroke-[3px]",
                    (props.size === 16 || !props.size) && "size-[14px]",
                    props.size === 14 && "size-[12px]",
                    props.size === 12 && "size-[10px]",
                    props.size === 10 && "size-[8px]"
                )}
            />
        </IconButton>
    )
}