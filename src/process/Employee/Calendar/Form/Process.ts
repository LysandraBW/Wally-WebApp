import { toDatabaseDateTime } from "@/lib/Convert/Convert";
import { objectMatch, updatedValue } from "@/lib/Process/Difference";
import { MathSet } from "@/lib/Process/MathSet";
import { EventsFormStructure } from "./Form";

export interface ProcessedEventsFormStructure {
    Update: Array<{
        EventID: number;
        Name: string | null;
        Summary: string | null;
        Date: string | null;
    }>;
    Insert: {
        Event: Array<{
            Name: string;
            Summary: string;
            Date: string;
            Sharees: Array<string>;
        }>;
        Sharee: Array<{
            EventID: number;
            EventShareeID: string;
        }>;
    };
    Delete: {
        Event: Array<{
            EventID: number;
        }>;
        Sharee: Array<{
            EventID: number;
            EventShareeID: string;
        }>;
    };
}

export async function processEventsForm(
    ref: EventsFormStructure, 
    cur: EventsFormStructure
):Promise<ProcessedEventsFormStructure> {
    const refEventIDs = new MathSet(Object.keys(ref.Events).map(n => parseInt(n)).sort());
    const curEventIDs = new MathSet(Object.keys(cur.Events).map(n => parseInt(n)).sort());

    const toUpdateEventIDs = refEventIDs.intersection(curEventIDs);
    const toInsertEventIDs = curEventIDs.difference(refEventIDs);
    const toDeleteEventIDs = refEventIDs.difference(curEventIDs);

    const processedEventsForm: ProcessedEventsFormStructure = {
        Update: [],
        Insert: {
            Event: [],
            Sharee: []
        },
        Delete: {
            Event: [],
            Sharee: []
        }
    }

    toUpdateEventIDs.forEach(async (eventID) => {
        const refEvent = ref.Events[`${eventID}`];
        const curEvent = cur.Events[`${eventID}`]; 

        if (!objectMatch(refEvent, curEvent, ['Name', 'Summary', 'Date'])) {
            processedEventsForm.Update.push({ 
                EventID: refEvent.EventID,
                Name: updatedValue(refEvent.Name, curEvent.Name), 
                Summary: updatedValue(refEvent.Summary, curEvent.Summary),
                Date: updatedValue(toDatabaseDateTime(refEvent.UpdatedEvent), toDatabaseDateTime(curEvent.UpdatedEvent))
            });
        }

        const refEventSharees = new MathSet(refEvent.Sharees);
        const curEventSharees = new MathSet(curEvent.Sharees);

        const toDeleteSharees = refEventSharees.difference(curEventSharees);
        const toInsertSharees = curEventSharees.difference(refEventSharees);

        toDeleteSharees.forEach((shareeID) => {
            processedEventsForm.Delete.Sharee.push({
                EventID: eventID,
                EventShareeID: shareeID
            });
        });

        toInsertSharees.forEach((shareeID) => {
            processedEventsForm.Insert.Sharee.push({
                EventID: eventID,
                EventShareeID: shareeID
            });
        });
    });

    toInsertEventIDs.forEach((eventID) => {
        const curEvent = cur.Events[`${eventID}`];
        processedEventsForm.Insert.Event.push({
            Name: curEvent.Name,
            Summary: curEvent.Summary,
            Date: toDatabaseDateTime(curEvent.UpdatedEvent),
            Sharees: curEvent.Sharees
        });
    });

    toDeleteEventIDs.forEach((eventID) => {
        const refEvent = ref.Events[`${eventID}`];
        // Deleting Employee From Event's Shared Members
        if (refEvent.EmployeeID !== ref.EmployeeID) {
            processedEventsForm.Delete.Sharee.push({
                EventID: eventID,
                EventShareeID: ref.EmployeeID
            });
        }
        else {
            processedEventsForm.Delete.Event.push({
                EventID: eventID
            });
        }
    });

    return processedEventsForm;
}