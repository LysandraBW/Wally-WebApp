export function toString(v: any): string {
    if (!v && !Number.isInteger(v))
        return '';
    return v.toString();
}