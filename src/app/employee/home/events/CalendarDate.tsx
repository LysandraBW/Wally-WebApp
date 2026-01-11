import { Event, Events } from "./_DEF";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { formatTime } from "@/utils/convert";

interface CalendarDateProps {
    dateIndex: number;
    dateEvents: Events;
    onOpenEvent: (event: Event) => void;
    onOpenEvents: (dateIndex: number) => void;
}

export default function CalendarDate(props: CalendarDateProps) {
    const [events, setEvents] = useState(Object.entries(props.dateEvents));


    const onOpenEvent = (e: any, event: Event) => {
        e.stopPropagation();
        props.onOpenEvent(event);
    }


    useEffect(() => {
        setEvents(Object.entries(props.dateEvents));
    }, [props.dateEvents]);


    return (
        <div 
            onClick={() => props.onOpenEvents(props.dateIndex)}
            className={clsx(
                "w-full h-full overflow-x-clip overflow-y-clip",
                "backdrop-blur-sm",
                "grid-rows-1",
                // "relative z-0 after:fixed after:z-10 after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-base-0 dark:after:to-base-50"
            )}
        >
            <div 
                className={clsx(
                    "w-full h-full overflow-y-scroll scroll-hide",
                    "grid grid-rows-[auto_1fr] grid-cols-1 gap-1 p-0 px-2",
                    events.length && "relative z-0 after:pointer-events-none after:fixed after:z-10 after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-base-0 dark:after:to-base-50"
                )}
            >
                {/* This is that corner that tells you the date. */}
                <div
                    className={clsx(
                        "min-h-0 flex items-center justify-start",
                        "aspect-square w-min h-min my-2 mb-1 h-min",
                    )}
                >
                    <span className="text-[0.6rem] text-base-700 font-medium">
                        {props.dateIndex}
                    </span>
                </div>
                {/* 
                    This contains the events in that date. 
                    The UI is a bit sketch.
                */}
                <div className="flex flex-col gap-1  w-full">
                    {events.map(([eventID, event], i) => (
                        <div 
                            key={eventID}
                            onClick={(e) => onOpenEvent(e, event)}
                            className={clsx(
                                "shadow-xs py-0.5 bg-blue-500/10 hover:bg-blue-500/20  dark:bg-blue-500/10 px-1 border-[1px] border-blue-500/50 dark:border-blue-500 rounded-[4px]",
                                "cursor-pointer group w-full flex gap-4 justify-between items-center dark:hover:bg-blue-500/20",
                                // "after:top-0 hover:after:bg-blue-500 after:left-0 after:h-full after:w-[1px] after:bg-black after:absolute"
                            )}
                        >
                            <p className="text-[0.6rem] text-blue-500 tracking-wide font-medium whitespace-nowrap text-ellipsis overflow-hidden group-hover:text-blue-500">
                                {event.Name}
                            </p>
                            <span className="block whitespace-nowrap text-[0.6rem] text-blue-500 tracking-wide font-medium- relative top-[-0.5px] group-hover:text-blue-500">
                                {formatTime(event.Date)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}