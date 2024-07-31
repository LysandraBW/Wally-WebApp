export function toString(v: any): string {
    if (!v)
        return '';
    return v.toString();
}

export function toWebDateTime(date: Date): string {
    return date.toISOString().slice(0, -1);
}

export function toDatabaseDateTime(date: string): string {
    return date.replace('T', ' ');
}

export function toFloat(v: any): number {
    if (typeof v === 'number')
        return v;
    return parseFloat(v);
}

export function toInteger(v: any): number {
    if (typeof v === 'number')
        return v;
    return parseInt(v);
}

export const getTime = (date: Date) => {
    const parts: Array<string> = date.toUTCString().split(' ');

    let hour = parseInt(parts[4].slice(0, 2));
    let time = parts[4].slice(3, -3);

    const partOfDay = (hour < 12 ? 'AM' : 'PM');

    hour %= 12;
    if (hour === 0)
        hour = 12;

    return `${hour}:${time} ${partOfDay}`;
} 

export const getTimeFromWebDateTime = (date: string) => {
    const [, time] = date.split('T');

    let hour = parseInt(time.slice(0, 2));
    let minute = parseInt(time.slice(3, 5));

    const timeOfDay = hour < 12 ? 'AM' : 'PM';

    hour %= 12;
    if (hour === 0)
        hour = 12;

    return `${hour}:${minute} ${timeOfDay}`
}