import { getTimeFromDateString } from "@/utils/extract";
import { Events } from "./_DEF";
import { useEffect, useState } from "react";
import ClockIcon from "@/component/Icon/Clock";
import clsx from "clsx";

interface CalendarDateProps {
    dateIndex: number;
    dateEvents: Events;
    onOpenEvent: (eventID: string) => void;
    onOpenEvents: (dateIndex: number) => void;
}

export default function CalendarDate(props: CalendarDateProps) {
    const [events, setEvents] = useState(Object.entries(props.dateEvents));

    const onOpenEvent = (e: any, eventID: string) => {
        e.stopPropagation();
        props.onOpenEvent(eventID)
    }

    useEffect(() => {
        setEvents(Object.entries(props.dateEvents));
    }, [props.dateEvents]);

    return (
        <div 
            onClick={() => props.onOpenEvents(props.dateIndex)}
            className={clsx(
                "w-full h-full overflow-x-hidden overflow-y-scroll scroll-hide",
                "flex flex-col items-center gap-1 p-0 px-1"
            )}
        >
            {/* This is that corner that tells you the date. */}
            <div
                className={clsx(
                    "flex items-center justify-center",
                    "aspect-square w-min h-min my-2.5",
                )}
            >
                <span className="text-01 text-black">{props.dateIndex}</span>
            </div>
            {/* 
            This contains the events in that date. 
            The UI is a bit sketch.
            */}
            <div className="flex flex-col gap-1 px-1 w-full">
                {events.map(([eventID, event], i) => (
                    <div 
                        key={i}
                        onClick={(e) => onOpenEvent(e, eventID)}
                        className={clsx(
                            "shadow-sm p-1 bg-white px-1 border border-gray-300 border-x-0- rounded hover:bg-blue-50 hover:border-blue-200",
                            "cursor-pointer group w-full flex justify-between",
                            // "after:top-0 hover:after:bg-blue-500 after:left-0 after:h-full after:w-[1px] after:bg-black after:absolute"
                        )}
                    >
                        <p className="text-00 text-gray-700 font-medium whitespace-nowrap text-ellipsis overflow-hidden group-hover:text-blue-500">{event.Name}</p>
                        <div className="flex items-center gap-0.5">
                            <span className="whitespace-nowrap text-00 text-gray-400 tracking-wide font-medium relative top-[-0.5px] group-hover:text-blue-500">
                                {getTimeFromDateString(event.Date)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}