import { EventsFormStructure } from "@/submission/Employee/Calendar/Form";
import { getTime } from "@/lib/Convert/Convert";
import { goToApt, goToUpdateApt } from "@/lib/Navigation/Navigation";
import { getDateEvents } from "@/process/Employee/Calendar/Helper";

interface DayEvents {
    date: Date;
    events: EventsFormStructure;
    onClose: () => void;
    onAddEvent: () => void;
    onShowEvent: (eventID: number, aptID: string | null) => void;
}

export default function DayEvents(props: DayEvents) {
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