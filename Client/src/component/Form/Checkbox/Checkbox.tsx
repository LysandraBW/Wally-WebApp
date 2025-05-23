import clsx from "clsx";
import CheckIcon from "@/component/Icon/Check";
import { ReadWriteInputProps } from "@/features/Form/DEF";

export interface CheckboxProps extends ReadWriteInputProps {
    name: string;
    checked: boolean;
}

export default function Checkbox(props: CheckboxProps) {
    const onClick = (event: any) => {
        // event.preventDefault();
        event.stopPropagation();
        props.onChange(props.name, props.value);
    }

    return (
        <div className="flex items-center gap-1">
            <span
                onClick={onClick}
                className={clsx(
                    "w-[14px] h-[14px] bg-white",
                    "flex items-center justify-center hover:bg-gray-100",
                    "border border-gray-300 shadow-sm rounded-[2.5px] cursor-pointer",
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