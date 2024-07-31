'use server';
import { getSessionID } from "@/lib/Cookies/Cookies";
import { NoteFormStructure } from "./Note";
import { DeleteNote, DeleteNoteAttachment, InsertNote, InsertNoteAttachment, InsertNoteSharee, UpdateNote } from "@/database/Export";
import DeleteNoteSharee from "@/database/Appointment/SharedNote/Delete";
import { ProcessedNoteFormStructure, processNoteForm } from "./Process";
import { generateURL, uploadFile } from "@/lib/Files/Upload";

async function uploadAttachments(data: {
    SessionID: string,
    NoteID: number,
    fileList: unknown
}): Promise<boolean> {
    // Because the compiler (understandbly) cannot
    // verify the type of data.fileList,
    // I had to use 'unknown' and convert it to a File.
    const fileList = <File> data.fileList;

    // Upload File
    const url = await uploadFile(await generateURL(), fileList);
    if (!url)
        return false;

    // Insert Note Attachment
    const output = await InsertNoteAttachment({
        SessionID: data.SessionID,
        NoteID: data.NoteID, 
        Name: fileList.name,
        Type: fileList.type,
        URL: url
    });

    if (!output)
        throw 'Insert Note Attachment Error';

    return true;
}

export async function submitNoteForm(reference: NoteFormStructure, current: NoteFormStructure): Promise<boolean> {
    const processedForm: ProcessedNoteFormStructure = await processNoteForm(reference, current);
    const SessionID = await getSessionID();
    const AppointmentID = processedForm.AppointmentID;

    // Update Note
    for (const updateNote of processedForm.Update) {
        const output = await UpdateNote({
            SessionID,
            AppointmentID,
            ...updateNote
        });
        if (!output)
            throw 'Update Note Error';
    }

    // Insert Attachment
    for (const insertAttachment of processedForm.Insert.Attachment) {
        if (!insertAttachment.Files.has('Files'))
            continue;

        const fileLists = insertAttachment.Files.getAll('Files');
        for (const fileList of fileLists) {
            const output = await uploadAttachments({
                NoteID: insertAttachment.NoteID,
                SessionID,
                fileList,
            });
            if (!output)
                throw 'Upload Attachment Error';
        }
    }

    // Insert Note
    for (const insertNote of processedForm.Insert.Note) {
        const noteID = await InsertNote({
            SessionID,
            AppointmentID,
            ...insertNote
        });
        if (!noteID)
            throw 'Error';

        // Inserting Note's Files
        if (insertNote.Files && insertNote.Files.has('Files')) {
            const fileLists = insertNote.Files.getAll('Files');
            for (const fileList of fileLists) {
                const output = await uploadAttachments({
                    NoteID: noteID,
                    SessionID,
                    fileList,
                });
                if (!output)
                    throw 'Upload Attachment Error';
            }
        }

        // Inserting Note's Attachments
        insertNote.Sharees.forEach(async (sharee) => {
            const output = await InsertNoteSharee({
                SessionID,
                NoteID: noteID,
                NoteShareeID: sharee
            });
            if (!output)
                throw 'Insert Note Error';
        }); 
    }

    // Insert Sharee
    for (const insertSharee of processedForm.Insert.Sharee) {
        const output = await InsertNoteSharee({
            SessionID,
            ...insertSharee
        });
        if (!output)
            throw 'Insert Note Sharee Error';
    }

    // Delete Attachment
    for (const deleteAttachment of processedForm.Delete.Attachment) {
        const output = await DeleteNoteAttachment({
            SessionID,
            ...deleteAttachment
        });
        if (!output)
            throw 'Delete Attachment Error';
    }

    // Delete Note
    for (const deleteNote of processedForm.Delete.Note) {
        const output = await DeleteNote({
            SessionID,
            ...deleteNote,
            AppointmentID
        });
        if (!output)
            throw 'Delete Note Error';
    }

    // Delete Sharee
    for (const deleteSharee of processedForm.Delete.Sharee) {
        const output = await DeleteNoteSharee({
            SessionID,
            ...deleteSharee
        });
        if (!output)
            throw 'Delete Note Sharee Error';
    }

    return true;
}
