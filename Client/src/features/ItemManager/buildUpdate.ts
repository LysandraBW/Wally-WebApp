import { MathSet } from "./helpers/MathSet";
import { sameMap } from "./helpers/sameMap";
import { updatedValue } from "./helpers/updatedValue";

export default function buildUpdate(
    oldItems: any, 
    newItems: any, 
    itemID: string, 
    updateKeys: Array<string>, 
    insertKeys: Array<string>, 
    deleteKey: string
) {
    const updates: any = {
        Update: [],
        Insert: [],
        Delete: []
    }

    const oldIDs = new MathSet(Object.keys(oldItems));
    const newIDs = new MathSet(Object.keys(newItems));

    const toUpdateIDs = oldIDs.intersection(newIDs);
    const toInsertIDs = newIDs.difference(oldIDs);
    const toDeleteIDs = oldIDs.difference(newIDs);

    for (const ID of toUpdateIDs) {
        const oldItem = oldItems[ID];
        const newItem = newItems[ID];

        if (sameMap(oldItem, newItem, updateKeys))
            continue;

        const update: any = {[`${itemID}`]: ID};
        for (const updateKey of updateKeys)
            update[updateKey] = updatedValue(oldItem[updateKey], newItem[updateKey]);
        updates.Update.push(update);
    }

    for (const ID of toInsertIDs) {
        const newItem = newItems[ID];
        const insert: any = {};
        for (const insertKey of insertKeys)
            insert[insertKey] = newItem[insertKey];
        updates.Insert.push(insert);
    }

    for (const ID of toDeleteIDs) {
        if (ID < 0)
            continue;
        updates.Delete.push({
            [`${deleteKey}`]: ID
        });
    }

    return updates;
}