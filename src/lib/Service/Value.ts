export const flattenValues = (values: { [k: string]: Array<[number, string]>; }) => {
    return Object.values(values).flat().map(s => s[0]);
}