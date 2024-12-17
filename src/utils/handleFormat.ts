import moment from "moment";

export function toString(v: any): string {
    if (!v)
        return '';
    return v.toString();
}

export function toWebDateTime(date: Date): string {
    if (!date)
        return '';
    return date.toISOString().slice(0, -1);
}

export function toDisplayDateTime(date: Date): string {
    if (!date)
        return '';
    return moment(date).format('MMM D, YYYY, h:mm A');
}

export function toDatabaseDateTime(date: string): string {
    if (!date)
        return '';
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