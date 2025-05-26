import { useEffect, useState } from "react";
import { Days, Events, ShortenedDays, Years } from "./_DEF";
import CalendarDate from "./CalendarDate";
import getEventsWhen from "./getEventsWhen";
import clsx from "clsx";

interface CalendarProps {
    year: number;
    monthIndex: number;
    events: Events;
    onOpenEvent: (eventID: string) => void;
    onOpenEvents: (dateIndex: number) => void;
    closeOpenedEvent: () => void;
    closeOpenedEvents: () => void;
}

interface EventMap {
    [year: number]: {
        [monthIndex: number]: {
            [dateIndex: number]: [number, Events];
        }
    }
}

const thirtyFiveDays = Array.from(Array(35).keys());

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

                for (let dateIndex = 0; dateIndex < 35; dateIndex++) {
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
        <div className="">
            {/* These are the days of the week Sunday, Monday, etc. */}
            <div className="grid grid-cols-7">
                {ShortenedDays.map((day, i) => 
                    <div 
                        key={i} 
                        className={clsx(
                            "first:rounded-l-md last:rounded-r-md",
                            "flex items-center justify-center p-1",
                            "border-t first:border-l last:border-r border-gray-300 border-b",
                            "text-center shadow-sm bg-white mb-2"
                        )}
                    >
                        <span className="text-01 text-black tracking-wider font-medium">{day}</span>
                    </div>
                )}
            </div>
            <div className='grid grid-cols-7 grid-rows-4 shadow-sm'>
                {eventMap &&
                    thirtyFiveDays.map(i => {
                        // These are days that aren't actually in
                        // the month, they're like leftovers of
                        // the previous or next month.
                        if (eventMap[props.year][props.monthIndex][i][0] > 25 && i < 5)
                            return (
                                <div key={i} className="first:rounded-tl last:rounded-tr bg-gray-50 border-t border-r border-b border-gray-300 first:border-l"/>
                            );  
                        if (eventMap[props.year][props.monthIndex][i][0] <= 5 && i > 25)
                            return (
                                <div key={i} className="first:rounded-bl last:rounded-br bg-gray-100 border-b border-r border-gray-300"/>
                            );
                        return (
                            <div 
                                key={i}
                                className={clsx(
                                    "first:rounded-tl",
                                    "aspect-square",
                                    "border-r border-b",
                                    "border-gray-300",
                                    "hover:bg-gray-50 cursor-pointer", 
                                    i < 7 && "border-t",
                                    35 - i <= 7 && "border-b border-b-gray-300",
                                    i == 28 && "rounded-bl", 
                                    i % 7 == 0 && "border-l",
                                    i== 6 && "rounded-tr",
                                    i == 34 && "rounded-br"
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