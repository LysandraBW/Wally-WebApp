import clsx from "clsx";
import { ReadWriteInputProps } from "@/features/Form/DEF";
import CheckmarkIcon from "@/component/Icons/Icons/CheckIcon";

export interface CheckboxProps extends ReadWriteInputProps {
    name: string;
    checked: boolean;
}

export default function Checkbox(props: CheckboxProps) {
    const onClick = (event: any) => {
        event.stopPropagation();
        props.onChange(props.name, props.value);
    }

    return (
        <div className="flex items-center gap-1">
            <span
                onClick={onClick}
                className={clsx(
                    "w-4 h-4",
                    "flex items-center justify-center",
                    "surface surface-hover surface-border field-focus rounded",
                    "cursor-pointer",
                    props.checked && "!bg-blue-500 !border-blue-500"
                )}
            >
                {props.checked && 
                    <CheckmarkIcon
                        class="stroke-white stroke-[3px] size-2.5"
                    />
                }
            </span>
            <p className="field-text">
                {props.label}
            </p>
        </div>
    )
}