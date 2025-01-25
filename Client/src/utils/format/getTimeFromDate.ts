export function getTimeFromDate(date: Date) {
    const parts = date.toUTCString().split(' ');

    let hour = parseInt(parts[4].slice(0, 2));
    let time = parts[4].slice(3, -3);

    const timeOfDay = (hour < 12 ? 'AM' : 'PM');

    hour %= 12;
    if (hour === 0)
        hour = 12;

    return `${hour}:${time} ${timeOfDay}`;
} 
