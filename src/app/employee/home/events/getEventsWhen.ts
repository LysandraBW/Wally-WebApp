import { Events } from "./_DEF";

function sameDate(a: Date, b: Date) {
    const sameD = a.getDate() === b.getDate();
    const sameM = a.getMonth() === b.getMonth();
    const sameY = a.getFullYear() === b.getFullYear();
    return sameY && sameM && sameD;
}

export default function getEventsWhen(year: number, monthIndex: number, dateIndex: number, events: Events) {
    const date = new Date(year, monthIndex, dateIndex);
    const eventsWhen: Events = {};
    for (const [eventID, event] of Object.entries(events)) {
        if (sameDate(date, new Date(event.Date)))
            eventsWhen[eventID] = event;
    }
    return eventsWhen;
}