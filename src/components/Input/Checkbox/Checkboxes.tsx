import Check from "@/components/Icon/Check/Check";
import clsx from "clsx";

interface CheckboxesProps<T> {
    value: Array<T>;
    values: Array<[T, any]>;
    onChange: (value: T) => void;
}

export default function Checkboxes(props: CheckboxesProps<any>) {
    return (
        <div
            className={clsx(
                'w-max px-8 py-6 overflow-x-auto',
                'grid grid-cols-[auto_auto_auto_auto_auto] gap-x-4'
            )}
        >
            {props.values.map(([value, label], i) => (
                <label
                    key={i}
                    className={clsx(
                        'flex gap-x-2 items-center',
                        'whitespace-nowrap',
                    )}
                >
                    <span
                        onClick={() => props.onChange(value)}
                        className={clsx(
                            'w-4 h-4',
                            'flex justify-center items-center',
                            'border border-gray-300 rounded-sm',
                            props.value.includes(value) && 'bg-blue-400 !border-blue-400'
                        )}
                    >
                        {props.value.includes(value) && 
                            <Check
                                width='12'
                                height='12'
                                color='#FFF'
                                strokeWidth='1px'
                            />
                        }
                    </span>
                    <span 
                        className='whitespace-nowrap'
                    >
                        {label}
                    </span>
                </label>
            ))}
        </div>
    )
}