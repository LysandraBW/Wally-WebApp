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
                "w-full h-full overflow-clip",
                "flex flex-col gap-1 p-0.5"
            )}
        >
            {/* This is that corner that tells you the date. */}
            <div
                className={clsx(
                    "flex items-center justify-center",
                    "aspect-square w-min h-min p-2",
                    "border rounded"
                )}
            >
                <span className="text-00 font-medium">{props.dateIndex}</span>
            </div>
            {/* 
            This contains the events in that date. 
            The UI is a bit sketch.
            */}
            <div className="flex flex-col gap-1 px-0.5">
                {events.map(([eventID, event], i) => (
                    <div 
                        key={i}
                        onClick={(e) => onOpenEvent(e, eventID)}
                        className={clsx(
                            "p-1 pl-2 bg-blue-50",
                            "hover:bg-blue-100",
                            "cursor-pointer relative",
                            "after:top-0 after:left-0 after:h-full after:w-[1px] after:bg-blue-600 after:absolute"
                        )}
                    >
                        <p className="text-01 text-blue-600 font-medium">{event.Name}</p>
                        <div className="flex items-center gap-0.5">
                            {/* <ClockIcon
                                width="10"
                                height="10"
                                fill="#9ca3af"
                                stroke="#9ca3af"
                                strokeWidth="0.25"
                            /> */}
                            <span className="text-00 text-blue-300 font-semibold relative top-[-0.5px]">
                                {getTimeFromDateString(event.Date)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}