import { z } from "zod";
import { toString } from "@/utils/convert";
import { subsetOf } from "@/lib/Zod/InputTest";
import { NOTE } from "../_DEF";
import { Define } from "@/features/ItemManager/Define";
import { FormTest } from "@/features/Form/useForm/Form";
import { Note as DB_Note } from "waltronics-types";
import { filesToFormData } from "@/services/Cloud/filesToFormData";
import { MathSet } from "@/features/ItemManager/helpers/MathSet";
import { sameMap } from "@/features/ItemManager/helpers/sameMap";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";

export interface Note extends Omit<DB_Note, "Sharees" | "UpdationDate" | "CreationDate" | "ShowCustomer"> {
    UploadedAttachments: FileList | null;
    Sharees: Array<string>;
    ShowCustomer: Array<string>;
}

export interface Notes {
    [noteID: string]: Note;
}

export interface NoteUpdates {
    Update: Array<{
        NoteID: string;
        AppointmentID: string;
        Head: string | null;
        Body: string | null;
        ShowCustomer: string | null;
    }>;
    Insert: {
        Attachment: Array<{
            NoteID: string;
            Files: FormData;
        }>;
        Note: Array<{
            AppointmentID: string;
            Head: string;
            Body: string;
            ShowCustomer: string;
            Files: FormData | null;
            Sharees: Array<string>;
        }>;
        Sharee: Array<{
            NoteID: string;
            NoteShareeID: string;
        }>;
    };
    Delete: {
        Attachment: Array<{
            NoteID: string;
            AttachmentID: number;
        }>;
        Note: Array<{
            NoteID: string;
            AppointmentID: string;
        }>;
        Sharee: Array<{
            NoteID: string;
            NoteShareeID: string;
        }>;
    };
}

export class DefineNote extends Define<DB_Note, Note, Notes> {
    formID = NOTE;
    itemID = "NoteID";
    itemName = "Note";
    
    test(isCreator: boolean, shareeIDs: Array<string>): FormTest {
        return z.object({
            NoteID: z.string().or(z.literal("")),
            EmployeeID: z.string().or(z.literal("")),
            Head: z.string().min(1),
            Body: z.string().min(1),
            Sharees: subsetOf(shareeIDs),
            ShowCustomer: subsetOf(["0", "1"]).or(z.string().refine(v => !isCreator && v === "")),
            Attachments: z.array(z.object({
                NoteID: z.number(),
                AttachmentID: z.number(),
                URL: z.string(),
                Name: z.string()
            })),
            UploadedAttachments: z.custom(v => !v || v instanceof FileList),
        })
    }

    buildItem(baseItem: DB_Note | null): Note {
        return {
            NoteID: toString(baseItem?.NoteID),
            EmployeeID: toString(baseItem?.EmployeeID),
            AppointmentID: baseItem?.AppointmentID || "",
            Head: toString(baseItem?.Head),
            Body: toString(baseItem?.Body),
            ShowCustomer: baseItem ? [baseItem.ShowCustomer ? "1" : "0"] : ["0"],
            Attachments: baseItem?.Attachments || [],
            UploadedAttachments: null,
            Sharees: baseItem ? baseItem.Sharees.map(s => s.ShareeID) : []
        }
    }

    buildItems(baseItems: DB_Note[]): Notes {
        const notes: Notes = {};
        for (const note of baseItems)
            notes[note.NoteID] = this.buildItem(note);
        return notes;
    }
}

export const buildNoteUpdate = (appointmentID: string, oldItems: Notes, newItems: Notes) => {
    const updates: NoteUpdates = {
        Update: [],
        Insert: {
            Attachment: [],
            Note: [],
            Sharee: []
        },
        Delete: {
            Attachment: [],
            Note: [],
            Sharee: []
        }
    }

    const oldIDs = new MathSet(Object.keys(oldItems));
    const newIDs = new MathSet(Object.keys(newItems));

    const toUpdateIDs = oldIDs.intersection(newIDs);
    const toInsertIDs = newIDs.difference(oldIDs);
    const toDeleteIDs = oldIDs.difference(newIDs);

    for (const ID of toUpdateIDs) {
        const oldItem = oldItems[ID];
        const newItem = newItems[ID];

        if (!sameMap(oldItem, newItem, ["Head", "Body", "ShowCustomer"])) {
            updates.Update.push({
                AppointmentID: appointmentID,
                NoteID: oldItem.NoteID,
                Head: updatedValue(oldItem.Head, newItem.Head),
                Body: updatedValue(oldItem.Body, newItem.Body),
                ShowCustomer: updatedValue(oldItem.ShowCustomer[0], newItem.ShowCustomer[0])
            });
        }

        // ATTACHMENTS
        const oldAttachmentIDs = new MathSet(oldItem.Attachments.map(a => a.AttachmentID));
        const newAttachmentIDs = new MathSet(newItem.Attachments.map(a => a.AttachmentID));
        const toDeleteAttachmentIDs = oldAttachmentIDs.difference(newAttachmentIDs);

        for (const attachmentID of toDeleteAttachmentIDs) {
            updates.Delete.Attachment.push({
                NoteID: ID,
                AttachmentID: attachmentID
            });
        }

        if (newItem.UploadedAttachments) {
            updates.Insert.Attachment.push({
                NoteID: ID,
                Files: filesToFormData(newItem.UploadedAttachments)
            });
        }

        // SHAREES
        const oldShareeIDs = new MathSet(oldItem.Sharees);
        const newShareeIDs = new MathSet(newItem.Sharees);
        const toDeleteShareeIDs = oldShareeIDs.difference(newShareeIDs);
        const toInsertShareeIDs = newShareeIDs.difference(oldShareeIDs);

        for (const shareeID of toDeleteShareeIDs) {
            updates.Delete.Sharee.push({
                NoteID: ID,
                NoteShareeID: shareeID
            });
        }

        for (const shareeID of toInsertShareeIDs) {
            updates.Insert.Sharee.push({
                NoteID: ID,
                NoteShareeID: shareeID
            })
        }
    }

    for (const ID of toInsertIDs) {
        const newItem = newItems[ID];
        updates.Insert.Note.push({
            AppointmentID: appointmentID,
            Head: newItem.Head,
            Body: newItem.Body,
            ShowCustomer: newItem.ShowCustomer[0],
            Files: filesToFormData(newItem.UploadedAttachments),
            Sharees: newItem.Sharees
        });
    }

    for (const ID of toDeleteIDs) {
        const oldItem = oldItems[ID];

        // Deleting Sharee
        if (oldItem.EmployeeID in oldItem.Sharees) {
            updates.Delete.Sharee.push({
                NoteID: ID,
                NoteShareeID: oldItem.EmployeeID
            });
        }
        else {
            updates.Delete.Note.push({
                NoteID: ID,
                AppointmentID: appointmentID
            });
        }
    }
    
    return updates
}