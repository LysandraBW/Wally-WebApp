// Link Attachments to Notes
// We "link" an attachment with the note
// it belongs to by adding the attachment
// to the property "Attachments" of the
// note object. This is an in-place operation.
export function linkAttachmentsToNotes(notes, attachments) {
    // The attachments are sorted by the ID.
    // of the note the attachment belongs to.
    // So, the structure of this variable would
    // look like so: {noteID: [attachments]}.
    const sortedAttachments = {};
    
    // Here, we're sorting the attachments.
    for (const a of attachments) {
        if (!sortedAttachments[a.NoteID])
            sortedAttachments[a.NoteID] = [];
        sortedAttachments[a.NoteID].push(a);
    }

    // Here, we're updating all the notes
    // with the attachments that they own.
    for (let i = 0; i < notes.length; i++) {
        notes[i].Attachments = sortedAttachments[notes[i].NoteID] || [];
    }
}