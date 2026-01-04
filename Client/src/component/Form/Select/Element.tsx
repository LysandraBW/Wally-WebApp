import CheckIcon from "@/component/Icons/Icons/CheckIcon";
import clsx from "clsx";
import { ReactNode } from "react";

interface ElementProps {
    label: string;
    selectValue: (event: any) => void;
    checked: boolean;
    smallText?: boolean;
    CheckedIcon?: ReactNode;
    NotCheckedIcon?: ReactNode;
    smaller?: boolean;
}

export default function Element(props: ElementProps) {
    return (
        <div 
            onClick={props.selectValue}
            className={clsx(
                "flex justify-between items-center px-2 py-1",
                "field-background field-hover",
                "!border-none !rounded-none",
                (props.checked || (!props.checked && props.NotCheckedIcon)) && "gap-1"
            )}
        >
            <span
                className={clsx(
                    "field-text",
                    (props.smallText || props.smaller) && "!text-xs",
                    props.checked && "text-blue-500"
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
                            className="size-3 stroke-blue-500 stroke-[3px]"
                        />
                    }
                </>
            }
        </div>
    )
}