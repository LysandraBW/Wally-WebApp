import { DB_Note } from "@/database/Types";

export enum NoteType { Attachment, File };

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