import clsx from "clsx";
import Value from "./Value";

interface ValueListProps<T> {
    value: Array<T>;
    values: Array<[T, string]>;
    onClick: (value: T) => void;
}

export default function ValueList<T>(props: ValueListProps<T>) {
    return (
        <div
            className={clsx(
                'absolute w-full max-h-[200px] z-[2]',
                'border border-gray-300 border-t-0 rounded-b',
                'shadow-md overflow-y-scroll'
            )}
        >
            {props.values.map(([value, label], i) => (
                <div key={i}>
                    <Value
                        value={value}
                        label={label}
                        checked={props.value.includes(value)}
                        onClick={props.onClick}
                    />
                </div>
            ))}
        </div>
    )
}