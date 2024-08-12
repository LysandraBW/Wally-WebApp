import { EventsFormStructure, UpdateEvent } from "@/submission/Employee/Calendar/Form";

export function equalDates(a: Date, b: Date) {
    const sameMonth = a.getMonth() === b.getMonth();
    const sameDate = a.getDate() === b.getDate();
    const sameYear = a.getFullYear() === b.getFullYear();
    return sameYear && sameMonth && sameDate;
}

export const getDateEvents = (date: Date, events: EventsFormStructure) => {
    const dateEvents: Array<UpdateEvent> = [];
    for (const event of Object.values(events.Events)) {
        if (equalDates(date, new Date(event.UpdatedDate)))
            dateEvents.push(event);
    }
    return dateEvents;
}

export function numberDaysInMonth(fullYear: number, month: number) {
    return new Date(fullYear, month, 0).getDate();
}