import { DB_Note } from "@/services/DB/Interface/Employee";
import { z } from "zod";
import { toString } from "@/utils/convert";
import { subsetOf } from "@/lib/Zod/InputTest";
import { NOTE } from "../_DEF";
import { Define } from "@/features/ItemManager/Define";
import { FormTest } from "@/features/Form/useForm/Form";

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