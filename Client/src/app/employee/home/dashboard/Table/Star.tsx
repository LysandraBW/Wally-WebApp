import clsx from "clsx";
import StarIcon from "@/component/Icons/Icons/StarIcon";

export default function Star(props: {seen: boolean; starred: boolean; markAsStarred: () => void, i?: number}) {
    return (
        <div 
            data-row={props.i || ""}
            className={clsx(
                "flex justify-center items-center",
                "border-r border-b border-base-300 dark:border-base-200",
                "hover:!bg-white dark:hover:!bg-base-200",
                !props.seen && "bg-base-100 dark:bg-[#121214]",
                props.seen && "!bg-base-200 dark:!bg-base-50",
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
                    className="size-4 fill-blue-500 stroke-[1.25px] stroke-blue-500 cursor-pointer"
                />
            }
        </div>
    )
}