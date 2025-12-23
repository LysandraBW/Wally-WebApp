import CheckIcon from "@/component/Icons/Icons/CheckIcon";
import clsx from "clsx";
import { ReactNode } from "react";

interface ElementProps {
    label: string;
    selectValue: () => void;
    checked: boolean;
    CheckedIcon?: ReactNode;
    NotCheckedIcon?: ReactNode;
}

export default function Element(props: ElementProps) {
    return (
        <div 
            onClick={props.selectValue}
            className={clsx(
                "flex justify-between items-center px-2 py-1",
                "surface surface-hover",
                "!border-none !rounded-none"
            )}
        >
            <span
                className={clsx(
                    "field-text",
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
                            class="size-3 stroke-blue-500 stroke-[3px]"
                        />
                    }
                </>
            }
        </div>
    )
}