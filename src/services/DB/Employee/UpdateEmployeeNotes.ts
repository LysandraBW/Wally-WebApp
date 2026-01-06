import { request } from "../request";
import { uploadFile } from "@/services/Cloud/uploadFile";
import { generateURL } from "@/services/Cloud/generateURL";
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

        // for (const INSERT of updates.Insert.Attachment) {
        //     const files = INSERT.Files.getAll("Files");
        //     for (const file of files) {
        //         if (!(file instanceof File))
        //             continue;
        //         const _file = file as File;
        //         const URL = await uploadFile(await generateURL(), _file);
        //         request("PUT", `/appointment/note/${INSERT.NoteID}/attachment`, {
        //             name: _file.name,
        //             type: _file.type,
        //             url: URL
        //         });
        //     }
        // }

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

            // if (INSERT.Files) {
            //     const files = INSERT.Files.getAll("Files");
            //     for (const file of files) {
            //         if (!(file instanceof File))
            //             continue;
            //         const _file = file as File;
            //         const URL = await uploadFile(await generateURL(), _file);
            //         console.log(3.1);
            //         request("PUT", `/appointment/note/${output.output}/attachment`, {
            //             name: _file.name,
            //             type: _file.type,
            //             url: URL
            //         });
            //     }
            // }

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
        console.log("helllur? WTF")
        console.error(error);
        return false;
    }
}