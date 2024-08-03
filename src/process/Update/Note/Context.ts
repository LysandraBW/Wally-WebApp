import { DB_GeneralEmployee } from "@/database/Types";
import { PageContextStructure } from "../Context";
import { UpdateNote } from "@/submission/Employee/Update/Note/Form";

interface NoteContextStructure {
    isNoteOwner: boolean;
    noteOwner: {
        name: string;
        employee: DB_GeneralEmployee;
    }
    noteSharees: Array<[string, string]>;
}

export const DefaultNoteContext: NoteContextStructure = {
    isNoteOwner: false,
    noteOwner: {
        name: '',
        employee: {
            EmployeeID: '',
            FName: '',
            LName: ''
        }
    },
    noteSharees: []
}

export const loadNoteContext = (context: PageContextStructure, note: UpdateNote) => {
    const owner = context.Employees.find(e => e.EmployeeID === note.EmployeeID);
    if (!owner)
        throw 'Cannot Find Event Owner';

    const ownerName = `${owner.FName} ${owner.LName}`;
    const isNoteOwner = owner.EmployeeID === context.Employee.Employee.EmployeeID || note.NoteID === -1;
    const noteSharees = context.Employees.filter(e => (
        e.EmployeeID !== owner.EmployeeID
    )).map(e => (
        [e.EmployeeID, `${e.FName} ${e.LName}`]
    )) as Array<[string, string]>;

    return {
        isNoteOwner,
        noteOwner: {
            employee: owner,
            name: ownerName
        },
        noteSharees
    }
}