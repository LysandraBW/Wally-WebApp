import clsx from "clsx";
import { useEffect, useState } from "react";

interface SelectedValuesProps<T> {
    selectedValues: Array<T>;
    values: {[k: string]: Array<[T, any]>};
}

export default function SelectedValues(props: SelectedValuesProps<any>) {
    const [selectedLabels, setSelectedLabels] = useState<Array<string>>([]);

    // Storing (and/or Updating) the Labels of the Selected Values
    useEffect(() => {
        const flattenedValues = Object.values(props.values).flat();
        setSelectedLabels(flattenedValues.filter(v => props.selectedValues.includes(v[0])).map(v => v[1]));
    }, [props.selectedValues, props.values]);

    return (
        <div
            className={clsx(
                'flex flex-wrap gap-1 p-2',
                'rounded-b-[0.375rem] border border-gray-300',
                'shadow'
            )}
        >
            {selectedLabels.map((label, i) => (
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
            {!selectedLabels.length &&
                <div className='text-xs text-gray-400'>No Items Selected</div>
            }
        </div>
    )
}