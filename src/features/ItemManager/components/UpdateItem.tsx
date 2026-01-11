import IconButton from "@/component/Button/IconButton";
import EditIcon from "@/component/Icons/Icons/PencilSquareIcon";
import TrashIcon from "@/component/Icons/Icons/TrashIcon";
import clsx from "clsx";
import { PencilIcon } from "lucide-react";
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
                    "col-start-1 col-span-2"
                )}
            >
                {props.children}
            </div>
            <div
                className={clsx(
                    "hidden z-10 w-min h-min p-1",
                    "row-start-1 col-start-2 col-span-1",
                    "group-hover:flex gap-1"
                )}
            >
                <div 
                    onClick={props.onUpdate}
                    className="cursor-pointer bg-base-50 group hover:bg-base-100 w-[24px] rounded shadow-sm aspect-square border border-base-300 dark:border-base-200 stroke-base-700 flex justify-center items-center"
                >
                    <PencilIcon
                        className="size-3 stroke-inherit"
                    />
                </div>
                <div 
                    onClick={props.onDelete}
                    className="cursor-pointer bg-base-50 group hover:bg-base-100 w-[24px] rounded shadow-sm spect-square border border-base-300 dark:border-base-200 stroke-base-700 flex justify-center items-center"
                >
                    <TrashIcon
                        className="size-3.5 stroke-inherit"
                    />
                </div>
            </div>
        </div>
    )
}