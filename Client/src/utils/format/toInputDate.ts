export default function toInputDate(date: string | null | undefined) {
    if (!date)
        return "";
    const inputDate = date.replace('Z', 'T').slice(0, -1);
    return inputDate;
}