import { getTime } from "@/lib/Helper";
import { UpdateEvent } from "@/process/Employee/Calendar/Form/Form";

interface CalendarDateProps {
    date: number;
    dateEvents: Array<UpdateEvent>;
    onShowDate: (date: number) => void;
    onShowEvent: (eventID: number, appointmentID: string | null) => void;
}

export default function CalendarDate(props: CalendarDateProps) {
    return (
        <div
            onClick={() => {
                props.onShowDate(props.date);
            }}
        >
            <div>
                {props.date}
            </div>
            <div>
                {props.dateEvents.map((dateEvent, i) => (
                    <div key={i}
                        onClick={() => props.onShowEvent(dateEvent.EventID, dateEvent.AppointmentID)}
                    >
                        <h1>{dateEvent.Name}</h1>
                        <p>{dateEvent.Summary}</p>
                        <p>{getTime(dateEvent.Date)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}