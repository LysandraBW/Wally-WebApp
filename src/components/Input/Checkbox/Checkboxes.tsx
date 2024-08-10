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
                'w-full px-8 py-4 overflow-x-auto shadow-sm',
                'grid grid-cols-[auto_auto_auto_auto_auto] gap-y-2 gap-x-5'
            )}
        >
            {props.values.map(([value, label], i) => {
                const checked =  props.value.includes(value);
                
                return (
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
                                'w-3.5 h-3.5',
                                'flex justify-center items-center',
                                'border border-gray-300 rounded shadow-sm',
                                checked && 'bg-black !border-black'
                            )}
                        >
                            {checked && 
                                <Check
                                    width='9'
                                    height='9'
                                    color='#FFF'
                                    strokeWidth='2px'
                                />
                            }
                        </span>
                        <span 
                            className={clsx(
                                'text-sm whitespace-nowrap',
                                checked && 'font-medium'
                            )}
                        >
                            {label}
                        </span>
                    </label>
                )
            })}
        </div>
    )
}