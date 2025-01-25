import moment from "moment";

export function toDisplayDate(date: Date|string|null): string {
    if (!date)
        return '';
    let dateObject = typeof date === "string" ? new Date(date) : date;
    return moment(dateObject).format('MMM D, YYYY, h:mm A');
}