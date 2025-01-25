export function getTimeFromDateString(date: string) {
    const [, time] = date.split('T');

    let hour = parseInt(time.slice(0, 2));
    let minute = parseInt(time.slice(3, 5));

    const timeOfDay = hour < 12 ? 'AM' : 'PM';

    hour %= 12;
    if (hour === 0)
        hour = 12;

    return `${hour}:${minute} ${timeOfDay}`
}