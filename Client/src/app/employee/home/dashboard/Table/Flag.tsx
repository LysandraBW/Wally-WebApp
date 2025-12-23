import Bookmark from "@/component/Icons/Icons/BookmarkIcon";
import clsx from "clsx";

export default function Flag(props: {seen: boolean, flagged: boolean, markAsFlagged: () => void, i?: number}) {
    return (
        <div 
            data-row={props.i || ""}
            className={clsx(
                "p-2 !border-l-0 border-r border-r-gray-300 border-b border-b-gray-300 cursor-pointer",
                !props.seen && "bg-white"
            )}
            onClick={props.markAsFlagged}
        >
            {!props.flagged &&
                <Bookmark
                    class="fill-white stroke stroke-gray-300 cursor-pointer"
                />
            }
            {props.flagged &&
                <Bookmark
                    class="fill-red-500 stroke-red-600 cursor-pointer"
                />
            }
        </div>
    )
}