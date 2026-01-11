import { request } from "../request";
import { NoteUpdates } from "@/app/employee/home/update/note/_DEF";

export async function UpdateEmployeeNotes(updates: NoteUpdates) {
    try {
        let allOutput = true;

        for (const UPDATE of updates.Update) {
            const {output} = await request("POST", `/appointment/${UPDATE.AppointmentID}/note/${UPDATE.NoteID}`, {
                head: UPDATE.Head,
                body: UPDATE.Body,
                showCustomer: UPDATE.ShowCustomer
            });
            allOutput = allOutput && output !== false;
        }

        for (const INSERT of updates.Insert.Note) {
            const output = await request("PUT", `/appointment/${INSERT.AppointmentID}/note`, {
                head: INSERT.Head,
                body: INSERT.Body,
                showCustomer: INSERT.ShowCustomer
            });

            if (!output || output.output === false) {
                allOutput = false;
                continue;
            }

            if (INSERT.Sharees) {
                for (const noteShareeID of INSERT.Sharees) {
                    const insertShareeOutput = await request("PUT", `/appointment/note/${output.output}/sharee`, {
                        noteShareeID
                    });
                    allOutput = allOutput && insertShareeOutput.output !== false;
                }
            }
        }

        for (const INSERT of updates.Insert.Sharee) {
            const {output} = await request("PUT", `/appointment/note/${INSERT.NoteID}/sharee`, {
                noteShareeID: INSERT.NoteShareeID
            });
            allOutput = allOutput && output !== false;
        }

        for (const DELETE of updates.Delete.Attachment) {
            const {output} = await request("DELETE", `/appointment/note/${DELETE.NoteID}/attachment`, {
                attachmentID: DELETE.AttachmentID
            });
            allOutput = allOutput && output !== false;
        }

        for (const DELETE of updates.Delete.Sharee) {
            const {output} = await request("DELETE", `/appointment/note/${DELETE.NoteID}/sharee`, {
                noteShareeID: DELETE.NoteShareeID
            });
            allOutput = allOutput && output !== false;
        }

        for (const DELETE of updates.Delete.Note) {
            const {output} = await request("DELETE", `/appointment/${DELETE.AppointmentID}/note/${DELETE.NoteID}`);
            allOutput = allOutput && output !== false;
        }

        return allOutput;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}