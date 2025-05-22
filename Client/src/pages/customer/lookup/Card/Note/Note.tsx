import File from "@/component/Icon/File";
import { Note as DB_Note } from "waltronics-types";

interface NoteProps {
    note: DB_Note;
}

export default function Note(props: NoteProps) {
    return (
        <div className="rounded-md flex flex-col field border-gray-100 p-0 w-full">
            <div className="px-3 py-1.5">
                <p className="color-3">{props.note.Head}</p>
                <span className="block large color-4 text-xs">{props.note.Body}</span>
            </div>
            {props.note.Attachments &&
                <div className="border-t p-1">
                    {props.note.Attachments.map((attachment, i) => (
                        <div 
                            key={i} 
                            className="w-min p-1 flex gap-1 items-center field" 
                        >
                            <File fill="#E1E1E1"/>
                            <span className="large">{attachment.Name}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}