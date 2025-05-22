import { DB_EmployeeNote } from "@/services/DB/Interface/Employee";
import { Note } from "../edit/note/_DEF";
import Person from "@/component/Icon/Person";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { getCookie } from "@/utils/cookies/getCookie";
import GetEmployeeNamePairs from "@/services/DB/Procedure/Employee/GetEmployeeNamePairs";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import Paperclip from "@/component/Icon/Paperclip";
import Item from "@/features/ItemManager/Item/Item";

interface NoteItemProps {
    note: DB_EmployeeNote|Note;
}

export default function NoteItem(props: NoteItemProps) {
    const [tags, setTags] = useState<Array<Array<ReactNode>>>();
    const [idToEmployee, setIDToEmployee] = useState(null);

    useEffect(() => {
        const load = async () => {
            const sessionID = await getCookie("sessionID");
            const employees = await GetEmployeeNamePairs(sessionID);

            const tags = [];

            const IDToEmployee = idToEmployee || getValuesToLabels(employees);

            const sharees = [];
            for (const sharee of props.note.Sharees) {
                sharees.push((
                    <Fragment>
                        <Person
                            width="14"
                            height="14"
                            fill="#94a3b8"
                            stroke="#94a3b8"
                        />
                        {/* 
                        We have to account for the differing
                        types (they're largely the same).
                        */}
                        {IDToEmployee[
                            typeof sharee === "string" ?
                                sharee : 
                                sharee.ShareeID
                        ]}
                        {props.note.EmployeeID === sharee && 
                            <span className="text-blue-500 medium">
                                Creator
                            </span>
                        }
                    </Fragment>
                ));
            }
            if (sharees.length > 0)
                tags.push(sharees);

            const attachments = [];
            for (const attachment of props.note.Attachments) {
                attachments.push((
                    <Fragment>
                        <Paperclip
                            width="14"
                            height="14"
                            fill="#94A3B8"
                            stroke="#94A3B8"
                            strokeWidth="0.25"
                        />
                        {attachment.Name}
                    </Fragment>
                ));
            }

            if ("UploadedAttachments" in props.note && props.note.UploadedAttachments) {
                for (const attachment of props.note.UploadedAttachments) {
                    <Fragment>
                        <Paperclip
                            width="14"
                            height="14"
                            fill="#94A3B8"
                            stroke="#94A3B8"
                            strokeWidth="0.25"
                        />
                        <span className="block">{attachment.name}</span>
                        <span className="block text-red-500 bold">NEW</span>
                    </Fragment>
                }
            }
            
            if (attachments.length > 0)
                tags.push(attachments);
            setTags(tags);
        }
        load();
    }, []);
    
    return (
        <Item
            ID={parseInt(props.note.NoteID)}
            head={(
                <div>
                    <h6 className="font-medium text-05">{props.note.Head}</h6>
                    <p className="text-03 border-l border-gray-300 border-dashed ml-2 pl-2">{props.note.Body}</p>
                </div>
            )}
            tags={tags || []}
        />
    )
}