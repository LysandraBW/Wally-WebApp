import CheckIcon from "@/component/Icons/Icons/CheckIcon";
import clsx from "clsx";
import { ReactNode } from "react";

interface ElementProps {
    label: ReactNode;
    selectValue: (event: any) => void;
    checked: boolean;
    smallText?: boolean;
    CheckedIcon?: ReactNode;
    NotCheckedIcon?: ReactNode;
    smaller?: boolean;
    obvious?: boolean;
}

export default function Element(props: ElementProps) {
    return (
        <div 
            onClick={props.selectValue}
            className={clsx(
                "w-full grid grid-rows-1 grid-cols-[1fr_auto] justify-between items-center px-2 py-1",
                "field-background field-hover",
                "!border-none !rounded-none",
                (props.checked || (!props.checked && props.NotCheckedIcon)) && "gap-1",
                (props.checked && props.obvious) && "!bg-blue-500"
            )}
        >
            <span
                className={clsx(
                    "block min-w-0 field-text overflow-x-clip text-ellipsis",
                    (props.smallText || props.smaller) && "!text-xs",
                    (props.checked && !props.obvious) && "!text-blue-500",
                    (props.checked && props.obvious) && "!text-white"
                )}
            >
                {props.label}
            </span>
            {(!props.checked && props.NotCheckedIcon) &&
                props.NotCheckedIcon
            }
            {props.checked &&
                <>
                    {props.CheckedIcon ?
                        props.CheckedIcon
                        :
                        <CheckIcon
                            className={clsx(
                                "size-3 stroke-blue-500 stroke-[3px]",
                                (props.checked && props.obvious) && "!stroke-white"
                            )}
                        />
                    }
                </>
            }
        </div>
    )
}