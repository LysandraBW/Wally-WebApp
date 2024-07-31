import { getTime, getTimeFromWebDateTime } from "@/lib/Convert/Convert";
import { UpdateEvent } from "@/process/Employee/Calendar/Form/Form";
import { Console } from "console";

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
                        onClick={(event) => {
                            event.stopPropagation();
                            props.onShowEvent(dateEvent.EventID, dateEvent.AppointmentID);
                        }}
                    >
                        <h1>FART{dateEvent.Name}</h1>
                        <p>{dateEvent.Summary}</p>
                        <p>{getTimeFromWebDateTime(dateEvent.UpdatedEvent)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}