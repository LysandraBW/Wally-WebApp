import { NoteUpdates } from "@/pages/employee/edit/note/_DEF";
import { queryDB } from "../../queryDB";
import { uploadFile } from "@/services/Cloud/uploadFile";
import { generateURL } from "@/services/Cloud/generateURL";

export async function UpdateEmployeeNotes(sessionID: string, updates: NoteUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            console.log("ok..?", UPDATE);
            queryDB("appointment/updateNote", {
                sessionID,
                noteID: UPDATE.NoteID,
                appointmentID: UPDATE.AppointmentID,
                head: UPDATE.Head,
                body: UPDATE.Body,
                showCustomer: UPDATE.ShowCustomer
            });
        }

        for (const INSERT of updates.Insert.Attachment) {
            const files = INSERT.Files.getAll("Files");
            for (const file of files) {
                if (!(file instanceof File))
                    continue;
                const _file = file as File;
                const URL = await uploadFile(await generateURL(), _file);
                queryDB("appointment/insertNoteAttachment", {
                    sessionID,
                    noteID: INSERT.NoteID,
                    name: _file.name,
                    type: _file.type,
                    url: URL
                })
            }
        }

        for (const INSERT of updates.Insert.Note) {
            const noteID = await queryDB("appointment/insertNote", {
                sessionID,
                head: INSERT.Head,
                body: INSERT.Body,
                showCustomer: INSERT.ShowCustomer,
                appointmentID: INSERT.AppointmentID
            });

            if (!noteID)
                throw "Error";

            if (INSERT.Files) {
                const files = INSERT.Files.getAll("Files");
                for (const file of files) {
                    if (!(file instanceof File))
                        continue;
                    const _file = file as File;
                    const URL = await uploadFile(await generateURL(), _file);
                    queryDB("appointment/insertNoteAttachment", {
                        sessionID,
                        noteID,
                        name: _file.name,
                        type: _file.type,
                        url: URL
                    })
                }
            }

            if (INSERT.Sharees) {
                for (const noteShareeID of INSERT.Sharees) {
                    queryDB("appointment/insertNoteSharee", {
                        sessionID,
                        noteID,
                        noteShareeID
                    });
                }
            }
        }

        for (const INSERT of updates.Insert.Sharee) {
            queryDB("appointment/insertNoteSharee", {
                sessionID,
                noteID: INSERT.NoteID,
                noteShareeID: INSERT.NoteShareeID
            });
        }

        for (const DELETE of updates.Delete.Attachment) {
            queryDB("appointment/deleteNoteAttachment", {
                sessionID,
                noteID: DELETE.NoteID,
                attachmentID: DELETE.AttachmentID
            });
        }

        for (const DELETE of updates.Delete.Sharee) {
            queryDB("appointment/deleteNoteSharee", {
                sessionID,
                noteID: DELETE.NoteID,
                noteShareeID: DELETE.NoteShareeID
            });
        }

        for (const DELETE of updates.Delete.Note) {
            queryDB("appointment/deleteNote", {
                sessionID,
                noteID: DELETE.NoteID,
                appointmentID: DELETE.AppointmentID
            });
        }

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}