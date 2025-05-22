import { NoteUpdates } from "@/pages/employee/edit/note/_DEF";
import { request } from "../../request";
import { uploadFile } from "@/services/Cloud/uploadFile";
import { generateURL } from "@/services/Cloud/generateURL";

export async function UpdateEmployeeNotes(sessionID: string, updates: NoteUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            request("POST", `/appointment/${UPDATE.AppointmentID}/note/${UPDATE.NoteID}`, {
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
                request("PUT", `/appointment/note/${INSERT.NoteID}/attachment`, {
                    name: _file.name,
                    type: _file.type,
                    url: URL
                });
            }
        }

        for (const INSERT of updates.Insert.Note) {
            const output = await request("PUT", `/appointment/${INSERT.AppointmentID}/note`, {
                head: INSERT.Head,
                body: INSERT.Body,
                showCustomer: INSERT.ShowCustomer
            });

            if (!output || output.noteID)
                throw "Error";

            if (INSERT.Files) {
                const files = INSERT.Files.getAll("Files");
                for (const file of files) {
                    if (!(file instanceof File))
                        continue;
                    const _file = file as File;
                    const URL = await uploadFile(await generateURL(), _file);
                    request("PUT", `/appointment/note/${output.noteID}/attachment`, {
                        name: _file.name,
                        type: _file.type,
                        url: URL
                    });
                }
            }

            if (INSERT.Sharees) {
                for (const noteShareeID of INSERT.Sharees) {
                    request("PUT", `/appointment/note/${output.noteID}/sharee`, {
                        noteShareeID
                    });
                }
            }
        }

        for (const INSERT of updates.Insert.Sharee) {
            request("PUT", `/appointment/note/${INSERT.NoteID}/sharee`, {
                noteShareeID: INSERT.NoteShareeID
            });
        }

        for (const DELETE of updates.Delete.Attachment) {
            request("DELETE", `/appointment/note/${DELETE.NoteID}/attachment`, {
                attachmentID: DELETE.AttachmentID
            });
        }

        for (const DELETE of updates.Delete.Sharee) {
            request("DELETE", `/appointment/note/${DELETE.NoteID}/sharee`, {
                noteShareeID: DELETE.NoteShareeID
            });
        }

        for (const DELETE of updates.Delete.Note) {
            request("DELETE", `/appointment/${DELETE.AppointmentID}/note/${DELETE.NoteID}`);
        }

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}