import { Events } from "./_DEF";

function sameDate(a: Date, b: Date) {
    const sameD = a.getDate() === b.getDate();
    const sameM = a.getMonth() === b.getMonth();
    const sameY = a.getFullYear() === b.getFullYear();
    return sameY && sameM && sameD;
}

export default function getEventsWhen(year: number, monthIndex: number, dateIndex: number, allEvents: Events) {
    const date = new Date(year, monthIndex, dateIndex);
    const events: Events = {};
    for (const [eventID, event] of Object.entries(allEvents)) {
        if (sameDate(date, new Date(event.Date)))
            events[eventID] = event;
    }
    return events;
}