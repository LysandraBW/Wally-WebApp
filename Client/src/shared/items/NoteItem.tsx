import { EmployeeNote as DB_EmployeeNote } from "waltronics-types";
import { Fragment, ReactNode, useEffect, useState } from "react";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import Item from "@/features/ItemManager/components/Item";
import GetEmployeeNamePairs from "@/services/DB/Employee/GetEmployeeNamePairs";
import { Note } from "@/app/employee/home/update/note/_DEF";
import UserIcon from "@/component/Icons/Icons/UserIcon";

interface NoteItemProps {
    note: DB_EmployeeNote|Note;
}

export default function NoteItem(props: NoteItemProps) {
    const [tags, setTags] = useState<Array<Array<ReactNode>>>();
    const [idToEmployee, setIDToEmployee] = useState(null);

    useEffect(() => {
        const load = async () => {
            const employees = await GetEmployeeNamePairs();
            const IDToEmployee = idToEmployee || getValuesToLabels(employees);
            
            const tags = [];

            const sharees = [];
            for (const sharee of props.note?.Sharees) {
                sharees.push((
                    <div
                        className="flex items-center gap-1"
                    >
                        <UserIcon
                            className="size-2.5 stroke-base-500"
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
                        {props.note?.EmployeeID === sharee && 
                            <span className="text-blue-500 medium">
                                Creator
                            </span>
                        }
                    </div>
                ));
            }

            if ((props.note?.ShowCustomer as any) === true) {
                sharees.push((
                    <div
                        className="flex items-center gap-1"
                    >
                        <UserIcon
                            className="size-2.5 stroke-base-500"
                        />
                        <span className="text-base-500 medium">
                            Customer
                        </span>
                    </div>
                )); 
            }

            if (sharees.length > 0)
                tags.push(sharees);

            // const attachments = [];
            // for (const attachment of props.note?.Attachments) {
            //     attachments.push((
            //         <Fragment>
            //             <Paperclip
            //                 width="14"
            //                 height="14"
            //                 fill="#94A3B8"
            //                 stroke="#94A3B8"
            //                 strokeWidth="0.25"
            //             />
            //             {attachment.Name}
            //         </Fragment>
            //     ));
            // }

            // if ("UploadedAttachments" in props.note && props.note?.UploadedAttachments) {
            //     for (const attachment of props.note?.UploadedAttachments) {
            //         <Fragment>
            //             <Paperclip
            //                 width="14"
            //                 height="14"
            //                 fill="#94A3B8"
            //                 stroke="#94A3B8"
            //                 strokeWidth="0.25"
            //             />
            //             <span className="block">{attachment.name}</span>
            //             <span className="block text-red-500 bold">NEW</span>
            //         </Fragment>
            //     }
            // }
            
            // if (attachments.length > 0)
            //     tags.push(attachments);
            
            
            setTags(tags);
        }
        load();
    }, [props.note]);
    
    return (
        <Fragment>
            {tags &&
                <Item
                    ID={parseInt(props.note?.NoteID)}
                    head={(
                        <div>
                            <h6 className="font-medium text-04 tracking-wide">{props.note?.Head}</h6>
                            <p className="text-03 border-l- border-gray-300 border-dashed ml-0 pl-0">{props.note?.Body}</p>
                        </div>
                    )}
                    tags={tags || []}
                />
            }
        </Fragment>
    )
}