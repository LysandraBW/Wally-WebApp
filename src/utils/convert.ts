import moment from "moment";

export function formatMoney(v: any): string {
    if (v === undefined || v === null)
        return "";
    const money = parseFloat(v);
    return `$${money.toLocaleString()}`
}

export function formatDate(date: Date|string|null, format: string = "MM/DD/YYYY hh:mm A"): string {
    if (!date)
        return '';
    
    const standardDate = typeof date === "string" ? new Date(date) : date;
    return moment(standardDate).format(format);
}

export function formatTime(date: Date|string|null): string {
    if (!date)
        return '';

    const standardDate = typeof date === "string" ? new Date(date) : date;
    return standardDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
}

export function toSQLDateTime(date: string|null|undefined) {
    if (!date)
        return "";
    return date.replace('Z', 'T').slice(0, -1);
}

export function toInteger(v: any): number {
    if (typeof v === 'number')
        return v;
    return parseInt(v);
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

export function capitalize(s: string): string {
    let words = s.split(/[\s-]/);
    words = words.map(w => w[0].toUpperCase() + w.slice(1).toLowerCase());
    return words.join(" ");
}