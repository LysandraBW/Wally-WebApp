import { DB_Event } from "@/database/Types";
import { GetEventSharees } from "@/database/Export";
import { getSessionID } from "@/lib/Storage/Storage";
import { toWebDateTime } from "@/lib/Convert/Convert";
import { EventsFormStructure, EventsStructure, UpdateFormStructure } from "./Form";

export async function InitializeEventsForm(
    employeeID: string, 
    events: Array<DB_Event>
): Promise<EventsFormStructure> {
    const SessionID = await getSessionID();
    const Events: EventsStructure = {};

    let aptEventID = -1;
    for (const event of events) {
        let eventID = event.EventID || aptEventID--;

        let sharees: Array<string> = [];
        if (eventID > 0)
            sharees = (await GetEventSharees({SessionID, EventID: event.EventID})).map(sharee => sharee.ShareeID);

        Events[`${eventID}`] =  {
            ...event, 
            Sharees: sharees,
            UpdatedDate: toWebDateTime(event.Date)
        };
    }
    
    return {
        EmployeeID: employeeID,
        Events: Events
    } as EventsFormStructure;
}