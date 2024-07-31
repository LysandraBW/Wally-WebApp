import { EventsFormStructure } from "@/process/Employee/Calendar/Form/Form";
import { getDateEvents } from "./Calendar";
import { getTime } from "@/lib/Convert/Convert";

interface DateEventsProps {
    date: Date;
    events: EventsFormStructure;
    onClose: () => void;
    onAddEvent: () => void;
    onShowEvent: (eventID: number) => void;
}

export default function DateEvents(props: DateEventsProps) {
    return (
        <div>
            {getDateEvents(props.date, props.events).map(event => (
                <div>
                    {event.Name}
                    {event.Summary}
                    <p>{getTime(event.Date)}</p>
                </div>
            ))}
        </div>
    )
}