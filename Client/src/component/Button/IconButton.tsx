import clsx from "clsx";
import ButtonProps from "./ButtonProps";

export interface IconButtonProps extends Omit<ButtonProps, "class"> {
    size?: 3 | 2 | 1;
    roundedFull?: boolean;
}

export default function IconButton(props: IconButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                "flex justify-center items-center",
                "surface surface-hover surface-border aspect-square shadow-sm",
                "transition-all",
                (props.size === 3 || !props.size) && "p-[4px]",
                props.size === 2 && "p-[2px]",
                props.size === 1 && "p-[0px]",
                props.roundedFull && "!rounded-full"
            )}
        >
            <div 
                className={clsx(
                    "overflow-hidden flex justify-center items-center",
                    (props.size === 3 || !props.size) && "w-[16px] h-[16px]",
                    props.size === 2 && "w-[14px] h-[14px]",
                    props.size === 1 && "w-[8px] h-[8px]"
                )}    
            >
                {props.children}
            </div>
        </button>
    )
}