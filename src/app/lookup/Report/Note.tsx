import { toDisplayDate } from "@/utils/convert";
import { Note as DB_Note } from "waltronics-types";

export default function Note(props: {note: DB_Note}) {
    return (
        <div className="surface-border rounded-md p-3">
            <div className="flex items-center gap-1">
                <span className="block text-sm text-base-900 font-medium">
                    {props.note.Head}
                </span>
            </div>
            <span className="block text-sm tracking-wide text-base-500">
                {props.note.Body}
            </span>
            <span className="text-xs text-base-400 tracking-wide">
                {toDisplayDate(props.note.UpdationDate)}
            </span>
        </div>
    )
}