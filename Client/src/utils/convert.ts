import moment from "moment";

export function toFloat(v: any): number {
    if (typeof v === 'number')
        return v;
    return parseFloat(v);
}

export function toDisplayDate(date: Date | string | null): string {
    if (!date)
        return '';
    let dateObject = typeof date === "string" ? new Date(date) : date;
    return moment(dateObject).format('MMM D, YYYY, h:mm A');
}

export function toInputDate(date: string | null | undefined) {
    if (!date)
        return "";
    const inputDate = date.replace('Z', 'T').slice(0, -1);
    return inputDate;
}
export function toInteger(v: any): number {
    if (typeof v === 'number')
        return v;
    return parseInt(v);
}

export function toISOString(date: Date): string {
    if (!date)
        return '';
    return date.toISOString().slice(0, -1);
}

export function toSQLDate(date: string): string {
    if (!date)
        return '';
    return date.replace('T', ' ');
}

export function toString(v: any): string {
    if (!v && !Number.isInteger(v))
        return '';
    return v.toString();
}

export function toBytes(bytes: number) {
    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let i = 0;
    for (i; bytes > 1024; i++) {
        bytes /= 1024;
    }
    return bytes.toFixed(1) + ' ' + units[i];
}