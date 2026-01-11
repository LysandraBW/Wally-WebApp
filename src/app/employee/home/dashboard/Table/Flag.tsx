import Bookmark from "@/component/Icons/Icons/BookmarkIcon";
import clsx from "clsx";

export default function Flag(props: {seen: boolean, flagged: boolean, markAsFlagged: () => void, i?: number}) {
    return (
        <div 
            data-row={props.i || ""}
            className={clsx(
                "table-entry",
                props.seen && "seen",
            )}
            onClick={props.markAsFlagged}
        >
            {!props.flagged &&
                <Bookmark
                    className="size-4 fill-base-100 dark:fill-base-50 stroke-[1.25px] stroke-base-300 dark:stroke-base-200 cursor-pointer"
                />
            }
            {props.flagged &&
                <Bookmark
                    className="size-4 fill-blue-500 stroke-[1.25px] stroke-blue-500 cursor-pointer"
                />
            }
        </div>
    )
}