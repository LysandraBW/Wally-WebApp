import clsx from "clsx";
import { Note as DB_Note } from "waltronics-types";

interface NoteProps {
    note: DB_Note;
}

export default function Note(props: NoteProps) {
    return (
        <div 
            className={clsx(
                "w-full p-0",
                "flex flex-col",
                "field",
                "border-gray-100 rounded-md",
            )}
        >
            <div className="px-3 py-1.5">
                <p className="text-gray-500">
                    {props.note.Head}
                </p>
                <span 
                    className={clsx(
                        "block",
                        "text-gray-400 text-xs"
                    )}
                >
                    {props.note.Body}
                </span>
            </div>
        </div>
    )
}