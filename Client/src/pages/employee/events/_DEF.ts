import { Define } from "@/features/ItemManager/Define";
import { Event as DB_Event } from "waltronics-types";
import { z } from "zod";
import { toString, toInputDate } from "@/utils/convert";
import { subsetOf } from "@/lib/Zod/InputTest";
import { MathSet } from "@/features/ItemManager/helpers/MathSet";
import { sameMap } from "@/features/ItemManager/helpers/sameMap";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";
import { FormTest } from "@/features/Form/useForm/Form";

export const ShortenedDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
export const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const Years = Array.from(Array(30).keys()).map(y => y + 2000);

export interface Event extends Omit<DB_Event, "EventID" | "Sharees"> {
    EventID: string;
    Sharees: Array<string>;
}

export interface Events {
    [eventID: string]: Event;
}

export interface EventUpdates {
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

export class DefineEvent extends Define<DB_Event, Event, Events> {
    formID = "Event";
    itemID = "EventID";
    itemName = "Event";

    test(shareeIDs: Array<string>): FormTest {
        return z.object({
            EventID: z.string().or(z.literal("")),
            EmployeeID: z.string().or(z.literal("")),
            Name: z.string().min(1),
            Summary: z.string().min(1),
            Sharees: subsetOf(shareeIDs)
        })
    }

    buildItem(baseItem: DB_Event | null): Event {
        return {
            EventID: toString(baseItem?.EventID),
            EmployeeID: toString(baseItem?.EmployeeID),
            Name: toString(baseItem?.Name),
            Summary: toString(baseItem?.Summary),
            Date: toInputDate(baseItem?.Date),
            AppointmentID: baseItem?.AppointmentID || "",
            Sharees: baseItem ? baseItem.Sharees.map(s => s.ShareeID) : []
        }
    }

    buildItems(baseItems: DB_Event[]): Events {
        const events: Events = {};
        for (const event of baseItems)
            events[event.EventID] = this.buildItem(event);
        return events;
    }
}

export function makeEventUpdates(oldItems: Events, newItems: Events) {
    const updates: EventUpdates = {
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

    const oldIDs = new MathSet(Object.keys(oldItems));
    const newIDs = new MathSet(Object.keys(newItems));

    const toUpdateIDs = newIDs.intersection(oldIDs);
    const toInsertIDs = newIDs.difference(oldIDs);
    const toDeleteIDs = oldIDs.difference(newIDs);

    for (const ID of toUpdateIDs) {
        const oldItem = oldItems[ID];
        const newItem = newItems[ID];

        if (!sameMap(oldItem, newItem, ["Name", "Summary", "Date"])) {
            let date = updatedValue(oldItem.Date, newItem.Date);
            if (date)
                date = date.replace("T", " ") + ":00"
            updates.Update.push({
                EventID: ID,
                Name: updatedValue(oldItem.Name, newItem.Name),
                Summary: updatedValue(oldItem.Summary, newItem.Summary),
                Date: date
            });           
        }

        const oldSharees = new MathSet(oldItem.Sharees);
        const newSharees = new MathSet(newItem.Sharees);

        const toDeleteSharees = oldSharees.difference(newSharees);
        const toInsertSharees = newSharees.difference(oldSharees);

        for (const shareeID of toDeleteSharees) {
            updates.Delete.Sharee.push({
                EventID: ID,
                EventShareeID: shareeID
            });
        }

        for (const shareeID of toInsertSharees) {
            updates.Insert.Sharee.push({
                EventID: ID,
                EventShareeID: shareeID
            });
        }
    }

    for (const ID of toInsertIDs) {
        const newItem = newItems[ID];
        updates.Insert.Event.push({
            Name: newItem.Name,
            Summary: newItem.Summary,
            Date: newItem.Date.replace("T", " ") + ":00",
            Sharees: newItem.Sharees
        });
    }

    for (const ID of toDeleteIDs) {
        if (ID < 0)
            continue;
        const oldItem = oldItems[ID];
        if (oldItem.Sharees.includes(oldItem.EmployeeID)) {
            updates.Delete.Sharee.push({
                EventID: ID,
                EventShareeID: oldItem.EmployeeID
            });
        }
        else {
            updates.Delete.Event.push({
                EventID: ID
            });
        }
    }

    return updates;
}