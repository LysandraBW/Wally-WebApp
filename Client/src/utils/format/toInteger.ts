export function toInteger(v: any): number {
    if (typeof v === 'number')
        return v;
    return parseInt(v);
}