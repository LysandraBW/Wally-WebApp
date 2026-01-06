import Bookmark from "@/component/Icons/Icons/BookmarkIcon";
import clsx from "clsx";

export default function Flag(props: {seen: boolean, flagged: boolean, markAsFlagged: () => void, i?: number}) {
    return (
        <div 
            data-row={props.i || ""}
            className={clsx(
                "flex justify-center items-center",
                "border-r border-b border-base-300 dark:border-base-200",
                "cursor-pointer",
                "hover:!bg-white dark:hover:!bg-base-200",
                !props.seen && "bg-base-100 dark:bg-[#121214]",
                props.seen && "!bg-base-200 dark:!bg-base-50",
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