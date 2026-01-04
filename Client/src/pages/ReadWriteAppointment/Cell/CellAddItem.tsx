import Cell from "./Cell";
import clsx from "clsx";
import PlusIcon from "@/component/Icons/Icons/PlusIcon";


export function AddItem(props: {onClick: () => void}) {
    return (
        <button 
            className={clsx(
                "entry-size w-full",
                "flex justify-center items-center",
                "stroke-base-400 bg-base-100 dark:bg-base-50",
                "rounded-none",
                "hover:stroke-base-700 hover:bg-base-0 dark:hover:bg-base-0 "
            )}
            onClick={props.onClick}
        >
            <PlusIcon 
                className="size-5 stroke-inherit stroke-[2px]"
            />
        </button>
    )
}


export default function CellAddItem(props: {onClick: () => void}) {
    return (
        <Cell>
            <AddItem
                onClick={props.onClick}
            />
        </Cell>
    )
}