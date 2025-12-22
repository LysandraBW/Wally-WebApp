import CheckIcon from "@/component/Icon/Icons/CheckIcon";
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
                "surface clickable",
                "!border-none !rounded-none"
            )}
        >
            <span
                className={clsx(
                    "text-sm tracking-wide text-base-700",
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
                            class="w-4 h-4 stroke-blue-500 stroke-[2.5px]"
                        />
                    }
                </>
            }
        </div>
    )
}