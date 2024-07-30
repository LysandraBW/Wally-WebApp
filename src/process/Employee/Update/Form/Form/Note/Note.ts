import { DB_Note } from "@/database/Types";

export interface UpdateNote extends DB_Note {
    Type:       'Attachment' | 'File';
    Sharees:    Array<string>
    Files:      FormData | null;
}

export interface NoteFormStructure {
    AppointmentID:  string;
    Notes:          {[noteID: string]: UpdateNote};
}