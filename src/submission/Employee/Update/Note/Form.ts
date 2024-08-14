import { GetNoteSharees } from "@/database/Export";
import { DB_Appointment, DB_Note } from "@/database/Types";
import { getSessionID } from "@/lib/Storage/Storage";

export type DataKeys = 'Head' | 'Body' | 'Sharees' | 'ShowCustomer' | 'Files';
export enum NoteType {Attachment, File};

export interface UpdateNote extends DB_Note {
    Type: NoteType;
    Sharees: Array<string>
    Files: FormData | null;
}

export interface NotesStructure {
    [noteID: string]: UpdateNote;
}

export interface NoteFormStructure {
    EmployeeID: string;
    AppointmentID: string;
    Notes: NotesStructure;
}

export const InitialNoteForm = async (employeeID: string, appointment: DB_Appointment): Promise<NoteFormStructure> => {
    const notes: NotesStructure = {};
    for (const note of appointment.Notes) {
        let sharees = (await GetNoteSharees({
            SessionID: await getSessionID(),
            NoteID: note.NoteID
        })).map(sharee => sharee.ShareeID);

        notes[note.NoteID] =  { 
            ...note, 
            Type: NoteType.Attachment, 
            Files: null, 
            Sharees: sharees
        };
    }

    return {
        AppointmentID: appointment.AppointmentID,
        EmployeeID: employeeID,
        Notes: notes
    };
}