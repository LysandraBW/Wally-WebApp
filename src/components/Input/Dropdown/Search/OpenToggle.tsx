import ChevronDown from "@/components/Icon/Chevron/Down";
import { getFilteredValues } from "@/lib/Input/Filter";
import clsx from "clsx";

interface OpenToggleProps<T> {
    open: boolean;
    closeToggle: () => void;
    value: Array<T>;
    values: Array<[T, string]>;
    setFilteredList: (filteredList: Array<[T, string]>) => void;
    size?: number;
}

export default function OpenToggle<T>(props: OpenToggleProps<T>) {
    const changeHandler = (event: any): void => {
        const filter = event.target.value.toUpperCase();
        props.setFilteredList(getFilteredValues({
            size: props.size,
            value: props.value,
            values: props.values,
            filter: filter
        }));
    }
    
    return (
        <div
            className={clsx(
                'inputBox',
                'flex justify-between items-center',
                props.open && 'rounded-none rounded-t'
            )}
        >
            <input
                type='text'
                className='border-none !rounded-none !shadow-none !p-0 !h-min '
                placeholder='Search'
                onChange={event => changeHandler(event)}
            />
            <ChevronDown
                color='#3F4151'
            />
        </div>
    )
}