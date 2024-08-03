
export function toggleValue<T>(values: Array<T>, value: T): Array<T> {
    let updatedValue: Array<any> = [...values];
    const index = updatedValue.indexOf(value);
    if (index > -1)
        updatedValue.splice(index, 1);

    else
        updatedValue.push(value);
    return updatedValue;
}
