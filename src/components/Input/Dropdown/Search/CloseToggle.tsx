import ChevronDown from "@/components/Icon/Chevron/Down";
import { getToggleLabel } from "@/lib/Input/Dropdown/ToggleLabel";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface CloseToggleProps<T> {
    open: boolean;
    openToggle: () => void;
    value: Array<T>;
    values: Array<[T, string]>;
    defaultLabel: string;
    disabled?: boolean;
    multiple?: boolean;
}

export default function CloseToggle<T>(props: CloseToggleProps<T>) {
    const [toggleLabel, setToggleLabel] = useState(props.defaultLabel);

    useEffect(() => {
        setToggleLabel(getToggleLabel({
            multiple: props.multiple,
            defaultLabel: props.defaultLabel,
            value: props.value,
            values: props.values
        }));
    }, [...props.value]);

    const clickHandler = () => {
        if (!props.disabled)
            props.openToggle();
    }

    return (
        <div 
            onClick={clickHandler}
            className={clsx(
                'inputBox w-full',
                'flex justify-between items-center',
                !props.open && 'text-gray-500'
            )}
        >
            {toggleLabel}
            <ChevronDown
                color={'#3F4151'}
            />
        </div>
    )
}