import { EventsFormStructure } from "@/process/Employee/Calendar/Form/Form";
import { getDateEvents } from "./Calendar";
import { getTime } from "@/lib/Convert/Convert";
import { goToApt, goToUpdateApt } from "@/lib/Navigation/Redirect";

interface DateEventsProps {
    date: Date;
    events: EventsFormStructure;
    onClose: () => void;
    onAddEvent: () => void;
    onShowEvent: (eventID: number, aptID: string | null) => void;
}

export default function DateEvents(props: DateEventsProps) {
    return (
        <div>
            <span
                onClick={() => {
                    props.onClose();
                }}
            >
                x
            </span>
            {getDateEvents(props.date, props.events).map((event, i) => (
                <div key={i}>
                    <p>{event.Name}</p>
                    <p>{event.Summary}</p>
                    <p>{getTime(event.Date)}</p>
                    {!!event.AppointmentID &&
                        <div>
                            <p onClick={() => goToApt(event.AppointmentID)}>View Appointment</p>
                            <p onClick={() => goToUpdateApt(event.AppointmentID)}>Update Appointment</p>
                        </div>
                    }
                </div>
            ))}
            <button
                onClick={() => {
                    props.onAddEvent();
                }}
            >
                Add Event
            </button>
        </div>
    )
}