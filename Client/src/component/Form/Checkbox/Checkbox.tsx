import clsx from "clsx";
import CheckIcon from "@/component/Icon/Check";
import { ReadWriteInputProps } from "@/features/Form/DEF";

export interface CheckboxProps extends ReadWriteInputProps {
    name: string;
    checked: boolean;
}

export default function Checkbox(props: CheckboxProps) {
    const onClick = (event: any) => {
        event.stopPropagation(); 
        props.onChange(props.name, props.value)
    }

    return (
        <div className="flex items-center gap-1">
            <span
                onClick={onClick}
                className={clsx(
                    "w-4 h-4 bg-white",
                    "flex items-center justify-center",
                    "border shadow-sm rounded",
                    props.checked && `
                        !bg-blue-600 
                        border-blue-500 
                        text-white
                    `)}
            >
                {props.checked && 
                    <CheckIcon
                        width="10"
                        height="10"
                        fill="#FFF"
                        stroke="#FFF"
                        strokeWidth="1"
                    />
                }
            </span>
            {/* Label */}
            {props.label && 
                <span>
                    {props.label}
                </span>
            }
        </div>
    )
}