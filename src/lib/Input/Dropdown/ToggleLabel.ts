interface Parameters<T> {
    defaultLabel: string;
    value: Array<T>;
    values: Array<[T, string]>;
    multiple?: boolean;
}

export const getToggleLabel = <T>(data: Parameters<T>): string => {
    if (data.multiple) {
        return data.defaultLabel;
    }

    if (!data.multiple) {
        for (const [value, label] of data.values) {
            if (data.value.includes(value)) {
                return label;
            }
        }
    }

    return data.defaultLabel;
}