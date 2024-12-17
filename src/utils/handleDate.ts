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