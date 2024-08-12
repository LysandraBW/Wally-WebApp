import { DB_EmployeeNote } from "@/database/Types";

interface NoteProps {
    note: DB_EmployeeNote;
}

export default function Note(props: NoteProps) {    
    return (
        <div>
            <h1>{props.note.Head}</h1>
            <p>{props.note.Body}</p>
            {props.note.Attachments.map((attachment, i) => (
                <div key={i} className='w-100px h-100px'>
                    {attachment.URL}
                    <img key={i} src={attachment.URL}/>
                </div>
            ))}
        </div>
    )
}