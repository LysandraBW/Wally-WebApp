import { z } from "zod";
import { toString } from "@/utils/convert";
import { subsetOf } from "@/lib/Zod/InputTest";
import { NOTE } from "../_DEF";
import { Define } from "../Define";
import { FormTest } from "@/features/Form/useForm/Form";
import { Note as DB_Note } from "waltronics-types";

export interface Note extends Omit<DB_Note, "Sharees" | "UpdationDate" | "CreationDate" | "ShowCustomer"> {
    UploadedAttachments: FileList | null;
    Sharees: Array<string>;
    ShowCustomer: Array<string>;
}

export interface MappedNotes {
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

export class DefineNote extends Define<DB_Note, Note, MappedNotes> {
    key = NOTE;
    itemIDName = "NoteID";
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

    processThing(baseThing: DB_Note | null): Note {
        return {
            NoteID: toString(baseThing?.NoteID),
            EmployeeID: toString(baseThing?.EmployeeID),
            AppointmentID: baseThing?.AppointmentID || "",
            Head: toString(baseThing?.Head),
            Body: toString(baseThing?.Body),
            ShowCustomer: baseThing ? [baseThing.ShowCustomer ? "1" : "0"] : ["0"],
            Attachments: baseThing?.Attachments || [],
            UploadedAttachments: null,
            Sharees: baseThing ? baseThing.Sharees.map(s => s.ShareeID) : []
        }
    }

    processThings(baseThings: DB_Note[]): MappedNotes {
        const notes: MappedNotes = {};
        for (const note of baseThings)
            notes[note.NoteID] = this.processThing(note);
        return notes;
    }
}