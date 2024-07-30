import { DB_Event } from "@/database/Types";
import { UpdateStructure, UpdateEvent, UpdateFormStructure } from "./Form/Form";
import { GetEventSharees } from "@/database/Export";
import { getSessionID } from "@/lib/Cookies/Cookies";

export async function initializeUpdateForm(events: Array<DB_Event>): Promise<UpdateStructure> {
    let reference: {[k: string]: any} = {};
    const referenceEvents: {[eventID: number]: UpdateEvent} = {};

    let counter = -1;

    for (const event of events) {
        let ID = event.EventID || counter--;
        const sharees = (await GetEventSharees({SessionID: await getSessionID(), EventID: event.EventID})).map(sharee => sharee.ShareeID);
        referenceEvents[`${ID}`] =  { ...event, Sharees: sharees, UpdatedEvent: ''};
    }

    reference.Events = {
        Events: referenceEvents
    };

    return reference as UpdateStructure;
}

export const UpdateForm = async (events: Array<DB_Event>): Promise<UpdateFormStructure> => {
    const form = await initializeUpdateForm(events);
    return {
        reference: form,
        current: form
    };
}