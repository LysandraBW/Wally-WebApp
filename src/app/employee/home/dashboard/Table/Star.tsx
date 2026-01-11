import clsx from "clsx";
import StarIcon from "@/component/Icons/Icons/StarIcon";

export default function Star(props: {seen: boolean; starred: boolean; markAsStarred: () => void, i?: number}) {
    return (
        <div 
            data-row={props.i || ""}
            className={clsx(
                "table-entry",
                props.seen && "seen",
            )}
            onClick={props.markAsStarred}
        >
            {!props.starred &&
                <StarIcon
                    className="size-4 fill-base-100 dark:fill-base-50 stroke-[1.25px] stroke-base-300 dark:stroke-base-200 cursor-pointer"
                />
            }
            {props.starred &&
                <StarIcon
                    className="size-4 fill-yellow-400 stroke-yellow-400 cursor-pointer"
                />
            }
        </div>
    )
}