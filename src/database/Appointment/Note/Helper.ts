import { DB_Attachment, DB_Note } from "../../Types";

export async function attachAttachments(notes: Array<DB_Note>, attachments: Array<DB_Attachment>) {
    const sortedAttachments: {[noteID: number]: Array<DB_Attachment>} = {};
        
    for (const attachment of attachments) {
        if (!sortedAttachments[attachment.NoteID])
            sortedAttachments[attachment.NoteID] = [];
        sortedAttachments[attachment.NoteID].push(attachment);
    }

    for (let i = 0; i < notes.length; i++) {
        notes[i].Attachments = sortedAttachments[notes[i].NoteID] || [];
    }
}