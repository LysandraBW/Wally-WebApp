export function linkShareesToNotes(notes, sharees) {
    const linked = {};
    
    for (const sharee of sharees) {
        if (!linked[sharee.NoteID])
            linked[sharee.NoteID] = [];
        linked[sharee.NoteID].push(sharee);
    }

    for (let i = 0; i < notes.length; i++) {
        notes[i].Sharees = linked[notes[i].NoteID] || [];
    }
}