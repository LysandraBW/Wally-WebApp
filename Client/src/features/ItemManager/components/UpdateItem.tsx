import IconButton from "@/component/Button/IconButton";
import EditIcon from "@/component/Icons/Icons/PencilSquareIcon";
import TrashIcon from "@/component/Icons/Icons/TrashIcon";
import clsx from "clsx";
import { ReactNode } from "react";

export interface UpdateItemProps {
    canEdit: boolean;
    canDelete: boolean;
    children: ReactNode;
    onUpdate: () => void;
    onDelete: () => void;
}

// The point of this component is that it will display
// an Edit button, a Delete button, or neither, when
// the user hovers over the item. But, fundamentally,
// this just adds some buttons.

export default function UpdateItem(props: UpdateItemProps) {
    return (
        <div 
            className={clsx(
                "h-full group !p-0 !shadow-none",
                "grid grid-rows-1 grid-cols-[auto_min-content]"
            )}
        >
            <div 
                className={clsx(
                    "row-start-1",
                    "col-start-1 col-span-1"
                )}
            >
                {props.children}
            </div>
            <div
                className={clsx(
                    "hidden bg-base-100 z-10 w-min h-full",
                    "row-start-1 col-start-2 col-span-1 border-l border-base-300 dark:border-base-200",
                    "group-hover:grid grid-rows-2"
                )}
            >
                <div className="cursor-pointer bg-base-50 group hover:bg-base-100 w-[19.4px] border-b border-base-300 dark:border-base-200 stroke-base-700 flex justify-center items-center">
                    <EditIcon
                        className="size-3.5 stroke-inherit"
                    />
                </div>
                <div className="cursor-pointer bg-base-50 group hover:bg-base-100 w-[19.4px] border-base-300 dark:border-base-200 stroke-base-700 flex justify-center items-center">
                    <TrashIcon
                        className="size-3.5 stroke-inherit"
                    />
                </div>
            </div>
        </div>
    )
}