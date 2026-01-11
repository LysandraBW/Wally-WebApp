import { EmployeeNote as DB_EmployeeNote } from "waltronics-types";
import { Fragment, ReactNode, useEffect, useState } from "react";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";
import Item from "@/features/ItemManager/components/Item";
import GetEmployeeNamePairs from "@/services/db/Employee/GetEmployeeNamePairs";
import { Note } from "@/app/employee/home/update/note/_DEF";
import UserIcon from "@/component/Icons/Icons/UserIcon";
import { toInteger } from "@/utils/convert";

interface NoteItemProps {
    note: DB_EmployeeNote | Note;
}

export default function NoteItem(props: NoteItemProps) {
    const [tags, setTags] = useState<Array<Array<ReactNode>>>();
    const [idToEmployee, setIDToEmployee] = useState(null);

    useEffect(() => {
        const load = async () => {
            const employees = await GetEmployeeNamePairs();
            const IDToEmployee = idToEmployee || getValuesToLabels(employees);
            
            const sharees = [];
            for (const sharee of props.note?.Sharees) {
                sharees.push((
                    <div className="flex items-center gap-1">
                        <UserIcon
                            className="size-2.5 stroke-base-500 dark:stroke-base-400"
                        />
                        {/* 
                        Have to account for the differing
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

            if (props.note?.ShowCustomer === 1 || (props.note?.ShowCustomer as any)[0] === "1") {
                sharees.push((
                    <div className="flex items-center gap-1">
                        <UserIcon
                            className="size-2.5 stroke-base-500 dark:stroke-base-400"
                        />
                        <span className="text-base-500 dark:text-base-400 font-medium">
                            Showed to Customer
                        </span>
                    </div>
                )); 
            }

            const tags = [];
            if (sharees.length > 0)
                tags.push(sharees); 
            
            setTags(tags);
        }
        load();
    }, [props.note]);
    
    return (
        <Fragment>
            {tags &&
                <Item
                    ID={toInteger(props.note?.NoteID)}
                    head={(
                        <div>
                            <h6 className="font-medium text-sm tracking-wide">
                                {props.note?.Head}
                            </h6>
                            <p className="text-xs border-l- border-gray-300 border-dashed text-ellipsis overflow-hidden ml-0 pl-0">
                                {props.note?.Body}
                            </p>
                        </div>
                    )}
                    tags={tags || []}
                />
            }
        </Fragment>
    )
}