interface Parameters<T> {
    size: number | undefined,
    value: Array<T>,
    values: Array<[T, string]>,
    filter: string
}

export const getFilteredValues = <T>(data: Parameters<T>): Array<[T, string]> => {
    const filtered: Array<[any, string]> = [];
    for (let i = 0; i < data.values.length; i++) {
        const [value, label] = data.values[i];
        if (label.toUpperCase().includes(data.filter.toUpperCase()))
            filtered.push([value, label]);

        if (data.size && filtered.length >= data.size)
            break;
    }
    filtered.sort((a, b) => a[1].localeCompare(b[1]));

    const remainingLength = data.values.length - filtered.length;
    if (remainingLength > 0 && filtered.length !== 0)
        filtered.push([null, `+${remainingLength} More`]);
    else if (filtered.length === 0)
        filtered.push([null, 'No Matches']);

    return filtered;
}