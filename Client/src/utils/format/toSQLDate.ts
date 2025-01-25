export function toSQLDate(date: string): string {
    if (!date)
        return '';
    return date.replace('T', ' ');
}