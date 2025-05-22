import { Fragment, useState } from "react";
import clsx from "clsx";
import LeftButton from "./LeftButton";
import Note from "./Note";
import RightButton from "./RightButton";
import { ProtectedAppointment as DB_ProtectedAppointment } from "waltronics-types";

interface NotesTabProps {
    appointment: DB_ProtectedAppointment;
}

export default function NotesTab(props: NotesTabProps) {
    // Showing the user all the notes at once is
    // a bit cluttered-looking. So, we show one
    // at a time.
    const [noteIndex, setNoteIndex] = useState(0);

    const goToNote = (noteIndex: number) => {
        const numNotes = props.appointment.Notes.length;
        setNoteIndex(Math.max(0, Math.min(noteIndex, numNotes - 1)));
    }

    const nextNote = () => {
        // Looping Back to the Front
        if (noteIndex + 1 >= props.appointment.Notes.length) {
            setNoteIndex(0);
            return;
        }
        setNoteIndex(noteIndex + 1);
    }

    const prevNote = () => {
        // Looping Back to the End
        if (noteIndex - 1 < 0) {
            setNoteIndex(props.appointment.Notes.length - 1);
            return;
        }
        setNoteIndex(noteIndex - 1);
    }

    return (
        <Fragment>
            <div className="flex flex-col">
                {props.appointment.Notes.length === 0 && 
                    <div className="flex justify-center items-center pt-4">
                        <p className="color-4">No Notes</p>
                    </div>
                }
                {props.appointment.Notes.length !== 0 &&
                    <div className="flex flex-col">
                        {/* 
                        Preview of Notes 
                        I thought it would be nice
                        for the users to be able to jump to the note
                        they wanted to see.
                        */}
                        <div 
                            className={clsx(
                                "flex gap-1 py-1 px-6",
                                "border-b border-b-gray-100"
                            )}
                        >
                            {props.appointment.Notes.map((note, i) => (
                                <button 
                                    onClick={() => goToNote(i)}
                                    className={clsx(
                                        "w-min h-min p-1",
                                        i === noteIndex && `
                                            bg-blue-600 
                                            !border-blue-500 
                                            hover:bg-blue-600
                                        `
                                    )}>
                                    <span 
                                        className={clsx(
                                            "block whitespace-nowrap font-normal",
                                            i === noteIndex && "text-white"
                                        )}
                                    >
                                        Note {note.NoteID}
                                    </span>
                                </button>
                            ))}
                        </div>
                        {/* Current Note */}
                        <div className="p-6 py-1">
                            <Note
                                note={props.appointment.Notes[noteIndex]}
                            />
                        </div>
                        {/* Navigation */}
                        <div 
                            className={clsx(
                                "flex gap-1 justify-center items-center",
                                "px-4 py-1 border-t border-b border-gray-100"
                            )}
                        >
                            <LeftButton
                                onClick={prevNote}
                            />
                            <div className="field h-min w-min">
                                <span className="block whitespace-nowrap">
                                    {noteIndex + 1} of {props.appointment.Notes.length}
                                </span>
                            </div>
                            <RightButton
                                onClick={nextNote}
                            />
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    )
}