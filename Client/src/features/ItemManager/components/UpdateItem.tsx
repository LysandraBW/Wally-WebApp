import EditIcon from "@/component/Icons/Icons/PencilSquareIcon";
import TrashIcon from "@/component/Icon/Trash";
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
                "group !p-0 !shadow-none",
                "grid grid-rows-1 grid-cols-[auto_auto]"
            )}
        >
            {/*
            The "props.children" variable
            refers to the item that we're
            updating.
            */}
            <div 
                className={clsx(
                    "row-start-1",
                    "col-start-1 col-span-2"
                )}
            >
                {props.children}
            </div>
            {/*
            This is the overlay.
            */}
            <div 
                // I should put this styling as a separate class,
                // but I'm not going to do that right now.
                className={clsx(
                    "hidden z-10",
                    "row-start-1 col-start-2 col-span-1",
                    "group-hover:flex flex justify-end gap-1 p-1"
                )}
            >
                {/* Edit Button */}
                {props.canEdit &&
                    <button 
                        onClick={props.onUpdate}
                        className={clsx(
                            "flex justify-center items-center gap-1",
                            "h-min w-min aspect-square rounded",
                            "bg-white hover:bg-gray-50 shadow-sm",
                            "border border-gray-300 p-1"
                        )}
                    >
                        <EditIcon
                            width="16"
                            height="16"
                            fill="#94A3B8"
                            cursor="pointer"
                        />
                    </button>
                }
                {/* Delete Button */}
                {props.canDelete &&
                    <button 
                        onClick={props.onDelete}
                        className={clsx(
                            "flex justify-center items-center gap-1",
                            "h-min w-min aspect-square rounded",
                            "bg-white hover:bg-gray-50 shadow-sm",
                            "border border-gray-300 p-1"
                        )}
                    >
                        <TrashIcon
                            width="16"
                            height="16"
                            fill="#94A3B8"
                            cursor="pointer"
                        />
                    </button>
                }
            </div>
        </div>
    )
}