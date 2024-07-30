import { EventsFormStructure, UpdateStructure } from "./Form/Form";

// need to put this in a helper file or something
class MathSet extends Set {
    intersection(B: MathSet) {
        const common = new MathSet();
        this.forEach(e => {
            if (B.has(e)) {
                common.add(e);
            }
        })
        return common;
    }

    difference(B: MathSet) {
        const notCommon = new MathSet();
        this.forEach(e => {
            if (!B.has(e)) {
                notCommon.add(e);
            }
        })
        return notCommon;
    }
}

const objectMatch = (A: {[k: string]: any}, B: {[k: string]: any}, keys: Array<string>): boolean => {
    for (const key of keys) {
        if (A[`${key}`] !== B[`${key}`]) {
            return false;
        }
    }
    return true;
}

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

    console.log(refEventIDs, curEventIDs);

    const toUpdateEventIDs = refEventIDs.intersection(curEventIDs);
    const toInsertEventIDs = curEventIDs.difference(refEventIDs);
    const toDeleteEventIDs = refEventIDs.difference(curEventIDs);

    console.log(toUpdateEventIDs, toInsertEventIDs, toDeleteEventIDs);

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

        console.log(refEvent, curEvent);

        if (!objectMatch(refEvent, curEvent, ['Name', 'Summary', 'Date'])) {
            // can get a function that either returns null or the updated value, makes it look niceer
            processedEventsForm.Update.push({ 
                EventID: refEvent.EventID,
                Name: refEvent.Name !== curEvent.Name ? curEvent.Name : null, 
                Summary: refEvent.Summary !== curEvent.Summary ? curEvent.Summary : null,
                // this seems buggy, what if the reference event ok actually no they're both initialized to '' so it would be fine
                // this is why we need comments
                Date: refEvent.UpdatedEvent !== curEvent.UpdatedEvent ? curEvent.UpdatedEvent : null
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
            Date: curEvent.UpdatedEvent.replace('T', ' '),
            Sharees: curEvent.Sharees
        });
    });

    toDeleteEventIDs.forEach((eventID) => {
        processedEventsForm.Delete.Event.push({
            EventID: eventID
        });
    });

    return processedEventsForm;
}