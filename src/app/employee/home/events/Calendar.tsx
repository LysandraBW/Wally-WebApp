import { useEffect, useState } from "react";
import { Event, Events, ShortenedDays, Years } from "./_DEF";
import CalendarDate from "./CalendarDate";
import getEventsWhen from "./getEventsWhen";
import clsx from "clsx";

interface CalendarProps {
    year: number;
    monthIndex: number;
    events: Events;
    onOpenEvent: (event: Event) => void;
    onOpenEvents: (dateIndex: number) => void;
}

interface EventMap {
    [year: number]: {
        [monthIndex: number]: {
            [dateIndex: number]: [number, Events];
        }
    }
}

const fortyTwoDays = Array.from(Array(42).keys());

export default function Calendar(props: CalendarProps) {
    const [eventMap, setEventMap] = useState<EventMap>();

    useEffect(() => {
        // Here, we're sorting the events
        // by their year, month, and day, so
        // that we can easily access events
        // on a certain day.
        const eventMap: EventMap = {};
        for (const year of Years) {
            if (!eventMap[year])
                eventMap[year] = {}
        
            for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                if (!eventMap[year][monthIndex])
                    eventMap[year][monthIndex] = {};

                const startDate = new Date(year, monthIndex, 1);
                const startDay = startDate.getDay();

                for (let dateIndex = 0; dateIndex < 42; dateIndex++) {
                    const date = new Date(startDate);
                    if (dateIndex !== startDay)
                        date.setDate(dateIndex - startDay + 1);
                    
                    eventMap[year][monthIndex][dateIndex] = [
                        date.getDate(), 
                        getEventsWhen(
                            year, 
                            monthIndex, 
                            date.getDate(), 
                            props.events
                        )
                    ];
                }
            }
        }
        setEventMap(eventMap);
    }, [props.events]);

    return (
        <div 
            id="Calendar"
            className="min-h-0 grid grid-rows-[auto_1fr] gap-y-2"
        >
            {/* These are the days of the week Sunday, Monday, etc. */}
            <div className="grid grid-cols-7 shadow-sm rounded-[7px]">
                {ShortenedDays.map((day, i) => 
                    <div 
                        key={i} 
                        className={clsx(
                            "flex items-center justify-center p-1",
                            "border-t border-b first:border-l last:border-r border-base-300 dark:border-base-200",
                            "first:rounded-l-md last:rounded-r-md",
                            "bg-base-0 dark:bg-base-50"
                        )}
                    >
                        <span className="block text-[0.6rem] text-base-700 tracking-wider font-medium">
                            {day}
                        </span>
                    </div>
                )}
            </div>
            <div className="min-h-0 grid grid-cols-7 grid-rows-6 shadow-sm rounded-md">
                {eventMap &&
                    fortyTwoDays.map(i => {
                        // These are days that aren't actually in
                        // the month, they're like leftovers of
                        // the previous or next month.
                        if (eventMap[props.year][props.monthIndex][i][0] > 25 && i < 6)
                            return (
                                <div key={i} className="first:rounded-tl-md last:rounded-tr-md bg-base-100 dark:bg-[#121315] border-t border-r border-b border-base-300 dark:border-base-200 first:border-l"/>
                            );  
                        if (eventMap[props.year][props.monthIndex][i][0] <= 14 && i > 25)
                            return (
                                <div key={i} className="first:rounded-bl-md last:rounded-br-md bg-base-100 [&:nth-last-child(7)]:rounded-bl-md [&:nth-last-child(7)]:border-l [&:nth-child(7n-6)]:border-l  dark:bg-[#121315] border-b border-r border-base-300 dark:border-base-200"/>
                            );
                        return (
                            <div 
                                key={i}
                                className={clsx(
                                    "first:rounded-tl-md",
                                    "border-r border-b bg-base-0 dark:bg-base-50",
                                    "border-base-300 dark:border-base-200",
                                    "hover:bg-base-50 dark:hover:bg-base-0 cursor-pointer", 
                                    i < 7 && "border-t",
                                    i >= 35 && "border-b border-b-gray-300 dark:border-b-base-200",
                                    i == 35 && "rounded-bl-md", 
                                    i % 7 == 0 && "border-l",
                                    i== 6 && "rounded-tr-md",
                                    i == 41 && "rounded-br-md"
                                )}
                            >
                                <CalendarDate
                                    dateIndex={eventMap[props.year][props.monthIndex][i][0]}
                                    dateEvents={eventMap[props.year][props.monthIndex][i][1]}
                                    onOpenEvent={props.onOpenEvent}
                                    onOpenEvents={props.onOpenEvents}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}