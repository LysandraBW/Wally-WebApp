import { getSessionID } from "@/lib/Cookies/Cookies";
import { EventsFormStructure, UpdateStructure } from "./Form";
import { ProcessedEventsFormStructure, processEventsForm } from "./Process";
import { DeleteEvent, InsertEvent, InsertEventSharee, UpdateEvent } from "@/database/Export";
import DeleteEventSharee from "@/database/Employee/SharedEvent/Delete";
import util from 'util';

export async function submitEventsForm(
    ref: EventsFormStructure,
    cur: EventsFormStructure
): Promise<boolean> {
    const processedForm: ProcessedEventsFormStructure = await processEventsForm(ref, cur);

    console.log(util.inspect(processedForm, {showHidden: false, depth: null, colors: true}));
 
    // environment
    // error protocols
    const SessionID = await getSessionID();

    for (const updateEvent of processedForm.Update) {
        const output = await UpdateEvent({
            SessionID,
            ...updateEvent
        });
        if (!output)
            break;
    }

    for (const insertEvent of processedForm.Insert.Event) {
        const eventID = await InsertEvent({
            SessionID,
            Name: insertEvent.Name,
            Summary: insertEvent.Summary,
            Date: insertEvent.Date
        });
        if (!eventID)
            throw 'Error';

        console.log('BACK IN BLACK', insertEvent.Sharees);
        insertEvent.Sharees.forEach(async (sharee) => {
            const output = await InsertEventSharee({
                SessionID,
                EventID: eventID,
                EventShareeID: sharee
            });
            if (!output)
                throw 'Error';
        });
    }

    for (const deleteEvent of processedForm.Delete.Event) {
        const output = await DeleteEvent({
            SessionID,
            ...deleteEvent
        });
        if (!output) break;
    }

    for (const deleteSharee of processedForm.Delete.Sharee) {
        const output = await DeleteEventSharee({
            SessionID,
            ...deleteSharee
        });
        if (!output)
            break;
    }

    for (const insertSharee of processedForm.Insert.Sharee) {
        const output = await InsertEventSharee({
            SessionID,
            ...insertSharee
        });
        if (!output)
            break;
    }

    return true;
}