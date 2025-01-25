export function toISOString(date: Date): string {
    if (!date)
        return '';
    return date.toISOString().slice(0, -1);
}