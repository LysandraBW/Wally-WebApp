import { EventsFormStructure, UpdateEvent } from "@/submission/Employee/Calendar/Form";

export const Years = Array.from(Array(25).keys()).map(y => y + 2000);

export const Months = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'
];

export const Days = [
    'Sunday', 
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday'
];

export function sameDay(dateA: Date, dateB: Date) {
    const sameMonth = dateA.getMonth() === dateB.getMonth();
    const sameDay = dateA.getDate() === dateB.getDate();
    const sameYear = dateA.getFullYear() === dateB.getFullYear();
    return sameYear && sameMonth && sameDay;
}

export function numberDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}

export const getDateEvents = (date: Date, events: EventsFormStructure) => {
    const dateEvents: Array<UpdateEvent> = [];
    for (const event of Object.values(events.Events)) {
        if (sameDay(date, new Date(event.UpdatedDate)))
            dateEvents.push(event);
    }
    return dateEvents;
}