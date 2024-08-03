import DeleteButton from "@/components/Button/Text/Delete";
import EditButton from "@/components/Button/Text/Edit";
import { DB_Attachment } from "@/database/Types";
import { NoteContext } from "./UpdateNote";
import { useContext } from "react";

interface NoteCardProps {
    head: string;
    body: string;
    attachments: Array<DB_Attachment>;
    files: FormData | null;
    onEdit: () => void;
    onDelete: () => void;
}

export default function NoteCard(props: NoteCardProps) {
    const noteContext = useContext(NoteContext);
    
    return (
        <div>
            <p>{props.head}</p>
            <p>{props.body}</p>
            <p>Owned By {noteContext.noteOwner.name}</p>
            {noteContext.isNoteOwner &&
                <div>
                    <p>Shared With</p>
                    <ul>
                        {noteContext.noteSharees.map((e, i) => (
                            <li key={i}>{e}</li>
                        ))}
                    </ul>
                </div>
            }
            <EditButton 
                onClick={props.onEdit}
            />
            <DeleteButton
                onClick={props.onDelete}
            />
        </div>
    )
}