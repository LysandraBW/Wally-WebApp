import Check from "@/components/Icon/Check/Check";
import clsx from "clsx";

interface OptionProps<T> {
    value: T;
    label: string;
    checked: boolean;
    onClick: (value: T) => void;
}

export default function Option<T>(props: OptionProps<T>) {
    return (
        <div 
            onClick={() => props.onClick(props.value)}
            className={clsx(
                'group bg-white inputPadding',
                'flex justify-between items-center',
                'hover:bg-black !hover:text-white'
            )}
        >
            <label
                className={clsx(
                    'text-gray-500 group-hover:text-white',
                    props.checked && 'font-semibold'
                )}
            >
                {props.label}
            </label>
            {props.checked &&
                <Check
                    color='#000'
                    width='16'
                    height='16'
                    strokeWidth="1px"
                />
            }
        </div>
    )
}