import clsx from "clsx";
import { useEffect, useState } from "react";

interface RecordProps<T> {
    value: Array<T>;
    values: {[k: string]: Array<[T, any]>};
}

export default function Record(props: RecordProps<any>) {
    const [valueLabels, setValueLabels] = useState<Array<string>>([]);

    useEffect(() => {
        const flattenedValues = Object.values(props.values).flat();
        setValueLabels(flattenedValues.filter(v => props.value.includes(v[0])).map(v => v[1]));
    }, [props.value, props.values]);

    return (
        <div
            className={clsx(
                'flex flex-wrap gap-1 p-2',
                'rounded-b-[0.375rem] border border-gray-300',
                'shadow'
            )}
        >
            {valueLabels.map((label, i) => (
                <div
                    key={i}
                    className={clsx(
                        'w-min p-1 bg-gray-100 shadow-sm font-medium',
                        'rounded-[0.375rem] border border-gray-300',
                        'text-xs text-gray-400 whitespace-nowrap'
                    )}
                >
                    {label}
                </div>
            ))}
            {!valueLabels.length &&
                <div className='text-xs text-gray-400'>No Items Selected</div>
            }
        </div>
    )
}