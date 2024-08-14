import UpdateNote from "./UpdateNote";
import CreateNote from "./CreateNote";
import { Fragment } from "react";
import { DB_Appointment } from "@/database/Types";
import useNoteManager from "@/process/Employee/Update/Note/Process";

interface NoteManagerProps {
    employeeId: string;
    appointment: DB_Appointment;
}

export default function NoteManager(props: NoteManagerProps) {
    const noteManager = useNoteManager(props.employeeId, props.appointment);

    return (
        <div>
            {!!noteManager.updated && 
                <Fragment>
                    <div>
                        Current Notes
                        {Object.entries(noteManager.updated.Notes).map(([noteID, note], i) => (
                            <div key={i}>
                                <UpdateNote
                                    note={note}
                                    onDelete={() => noteManager.deleteNote(noteID)}
                                    onUpdate={(note) => noteManager.updateNote(noteID, note)}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <CreateNote
                            onChange={value => noteManager.createNote(value)}
                        />
                    </div>
                    <button onClick={noteManager.saveNote}>Save</button>
                </Fragment>
            }
        </div>
    )
}