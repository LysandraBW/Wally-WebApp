import { DB_Event, DB_EventSharee } from "@/database/Types";
import { GetEventSharees } from "@/database/Export";
import { getSessionID } from "@/lib/Cookies/Cookies";
import { toWebDateTime } from "@/lib/Convert/Convert";
import { UpdateEvent, UpdateFormStructure, UpdateStructure } from "./Form";

export async function initializeUpdateForm(employeeID: string, events: Array<DB_Event>): Promise<UpdateStructure> {
    const SessionID = await getSessionID();
    const referenceEvents: {[eventID: number]: UpdateEvent} = {};

    let counter = -1;
    for (const event of events) {
        let ID = event.EventID || counter--;

        // Appointments (which are included in events) do not have sharees.
        // To avoid unnecessary calls, I only call GetEventSharees
        // for the events that might actually have them.
        let sharees: Array<string> = [];
        if (ID > 0)
            sharees = (await GetEventSharees({SessionID, EventID: event.EventID})).map(sharee => sharee.ShareeID);

        referenceEvents[`${ID}`] =  { ...event, Sharees: sharees, UpdatedEvent: toWebDateTime(event.Date)};
    }

    let reference: {[k: string]: any} = {};
    reference.Events = {
        EmployeeID: employeeID,
        Events: referenceEvents
    };

    return reference as UpdateStructure;
}

export const UpdateForm = async (employeeID: string, events: Array<DB_Event>): Promise<UpdateFormStructure> => {
    const form = await initializeUpdateForm(employeeID, events);
    return {
        current: form,
        reference: form,
    };
}