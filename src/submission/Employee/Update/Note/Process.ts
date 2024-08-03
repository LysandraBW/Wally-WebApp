import { sameObject, updatedValue } from "@/lib/Submission/Compare";
import { MathSet } from "@/lib/Submission/MathSet";
import { NoteFormStructure } from "./Form";

export interface ProcessedNoteFormStructure {
    AppointmentID: string;
    Update: Array<{
        NoteID: number;
        Head: string | null;
        Body: string | null;
        ShowCustomer: number | null;
    }>;
    Insert: {
        Attachment: Array<{
            NoteID: number;
            Files: FormData;
        }>;
        Note: Array<{
            Head: string;
            Body: string;
            ShowCustomer: number;
            Files: FormData | null;
            Sharees: Array<string>;
        }>;
        Sharee: Array<{
            NoteID: number;
            NoteShareeID: string;
        }>;
    };
    Delete: {
        Attachment: Array<{
            NoteID: number;
            AttachmentID: number;
        }>;
        Note: Array<{
            NoteID: number;
        }>;
        Sharee: Array<{
            NoteID: number;
            NoteShareeID: string;
        }>;
    };
}

export async function processNoteForm(reference: NoteFormStructure, current: NoteFormStructure):Promise<ProcessedNoteFormStructure> {
    const processedNotesForm: ProcessedNoteFormStructure = {
        AppointmentID: current.AppointmentID,
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

    const refNoteIDs = new MathSet(Object.keys(reference.Notes).map(n => parseInt(n)).sort());
    const curNoteIDs = new MathSet(Object.keys(current.Notes).map(n => parseInt(n)).sort());

    const toUpdateNoteIDs = refNoteIDs.intersection(curNoteIDs);

    toUpdateNoteIDs.forEach(async (noteID) => {
        const refNote = reference.Notes[`${noteID}`];
        const curNote = current.Notes[`${noteID}`]; 

        if (!sameObject(refNote, curNote, ['Head', 'Body', 'ShowCustomer'])) {
            // Difference Found
            processedNotesForm.Update.push({ 
                NoteID: refNote.NoteID,
                Head: updatedValue(refNote.Head, curNote.Head), 
                Body: updatedValue(refNote.Body, curNote.Body),
                ShowCustomer: updatedValue(refNote.ShowCustomer, curNote.ShowCustomer)
            });
        }

        // Differences Between Attachments
        const refNoteAttachmentIDs = new MathSet(refNote.Attachments.map(a => a.AttachmentID));
        const curNoteAttachmentIDs = new MathSet(curNote.Attachments.map(a => a.AttachmentID));

        // As users can only delete existing attachments,
        // we only need to look for the IDs that are only
        // in the refNote and not the curNote. 
        const toDeleteAttachmentIDs = refNoteAttachmentIDs.difference(curNoteAttachmentIDs);
        toDeleteAttachmentIDs.forEach((attachmentID) => {
            processedNotesForm.Delete.Attachment.push({
                NoteID: noteID,
                AttachmentID: attachmentID
            });
        });

        // Users can only add files, and these files
        // are stored in the Files key.
        if (curNote.Files) {
            processedNotesForm.Insert.Attachment.push({
                NoteID: noteID,
                Files: curNote.Files
            });
        }

        // Differences Between Sharees
        const refNoteSharees = new MathSet(refNote.Sharees);
        const curNoteSharees = new MathSet(curNote.Sharees);

        const toDeleteSharees = refNoteSharees.difference(curNoteSharees);

        toDeleteSharees.forEach((shareeID) => {
            processedNotesForm.Delete.Sharee.push({
                NoteID: noteID,
                NoteShareeID: shareeID
            });
        });

        const toInsertSharees = curNoteSharees.difference(refNoteSharees);

        toInsertSharees.forEach((shareeID) => {
            processedNotesForm.Insert.Sharee.push({
                NoteID: noteID,
                NoteShareeID: shareeID
            });
        });
    });

    // Inserted Notes
    const toInsertNoteIDs = curNoteIDs.difference(refNoteIDs);

    toInsertNoteIDs.forEach((noteID) => {
        const curNote = current.Notes[`${noteID}`];
        processedNotesForm.Insert.Note.push({
            Head: curNote.Head,
            Body: curNote.Body,
            ShowCustomer: curNote.ShowCustomer,
            Files: curNote.Files,
            Sharees: curNote.Sharees
        });
    });

    // Deleted Notes
    const toDeleteNoteIDs = refNoteIDs.difference(curNoteIDs);

    toDeleteNoteIDs.forEach((noteID) => {
        const refNote = reference.Notes[`${noteID}`];
        // Deleting Employee From Note's Shared Members
        if (refNote.EmployeeID !== reference.EmployeeID) {
            processedNotesForm.Delete.Sharee.push({
                NoteID: noteID,
                NoteShareeID: reference.EmployeeID
            });
        }
        else {
            processedNotesForm.Delete.Note.push({
                NoteID: noteID
            });
        }
    });

    return processedNotesForm;
}