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
    }, [props.value, props.values])

    return (
        <div
            className={clsx(
                'p-2',
                'rounded-b border border-gray-300'
            )}
        >
            {valueLabels.map((label, i) => (
                <div
                    key={i}
                    className={clsx(
                        'w-min p-1 bg-blue-100',
                        'rounded border border-blue-400',
                        'font-medium text-sm',
                        'text-blue-400 whitespace-nowrap'
                    )}
                >
                    {label}
                </div>
            ))}
        </div>
    )
}