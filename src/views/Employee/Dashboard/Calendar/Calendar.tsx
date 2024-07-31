import { EventsFormStructure, UpdateEvent } from "@/process/Employee/Calendar/Form/Form";
import { useEffect, useState } from "react";
import CalendarDate from "./CalendarDate";
import { sameDay } from "@/process/Employee/Calendar/Helper";

export interface CalendarProps {
    month:  number;
    year:   number;
    events: EventsFormStructure;
    onShowDate: (date: number) => void;
    onShowEvent: (eventID: number, appointmentID: string | null) => void;
}

export const getDateEvents = (date: Date, events: EventsFormStructure) => {
    const dateEvents: Array<UpdateEvent> = [];
    for (const event of Object.values(events)) {
        if (sameDay(date, event.Date))
            dateEvents.push(event);
    }
    return dateEvents;
}

export default function Calendar(props: CalendarProps) {
    const [monthFirstDayDate, setMonthFirstDayDate] = useState<Date>();

    useEffect(() => {
        const date: Date = new Date();
        date.setMonth(props.month);
        date.setFullYear(props.year);
        date.setDate(1);

        setMonthFirstDayDate(date);
    }, [props.month, props.year]);

    return (
        <div>
            {monthFirstDayDate && Array.from(Array(35).keys()).map(i => {
                const monthFirstDay = monthFirstDayDate.getDay();
                
                const calendarDate = new Date(monthFirstDayDate);
                if (i !== monthFirstDay)
                    calendarDate.setDate(i - monthFirstDay + 1);

                return (
                    <CalendarDate
                        date={calendarDate.getDate()}
                        dateEvents={getDateEvents(calendarDate, props.events)}
                        onShowDate={props.onShowDate}
                        onShowEvent={props.onShowEvent}
                    />
                );
            })}
        </div>
    )
}