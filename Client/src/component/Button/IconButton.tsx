import clsx from "clsx";
import ButtonProps from "./ButtonProps";

export interface IconButtonProps extends ButtonProps {
    size?: 16 | 14 | 12 | 10;
    roundedFull?: boolean;
    roundedLess?: boolean;
    paddingLess?: boolean;
}

export default function IconButton(props: IconButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                "flex justify-center items-center",
                "surface-background surface-color surface-background-hover surface-color-hover surface-border aspect-square shadow-sm",
                "transition-all",
                "p-[4px]",
                props.paddingLess && "!p-[2px]",
                props.roundedFull && "!rounded-full",
                props.roundedLess && "!rounded-[4px]",
                props.className
            )}
        >
            <div
                className={clsx(
                    "overflow-hidden flex justify-center items-center",
                    (props.size === 16 || !props.size) && "w-[16px] h-[16px]",
                    props.size === 14 && "w-[14px] h-[14px]",
                    props.size === 12 && "w-[12px] h-[12px]",
                    props.size === 10 && "w-[10px] h-[10px]"
                )}    
            >
                {props.children}
            </div>
        </button>
    )
}