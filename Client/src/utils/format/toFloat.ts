export function toFloat(v: any): number {
    if (typeof v === 'number')
        return v;
    return parseFloat(v);
}