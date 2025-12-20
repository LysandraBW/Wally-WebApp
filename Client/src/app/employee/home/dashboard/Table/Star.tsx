import clsx from "clsx";
import StarIcon from "@/component/Icon/Icons/Star";

export default function Star(props: {seen: boolean; starred: boolean; markAsStarred: () => void, i?: number}) {
    return (
        <div 
            data-row={props.i || ""}
            className={clsx(
                "p-2 !border-l-0 border-r border-r-gray-300 bg-gray-100 border-b border-b-gray-300",
                !props.seen && "bg-white"
            )}
            onClick={props.markAsStarred}
        >
            {!props.starred &&
                <StarIcon
                    class="fill-white stroke stroke-gray-300 cursor-pointer"
                />
            }
            {props.starred &&
                <StarIcon
                    class="fill-blue-500 stroke-blue-500 cursor-pointer"
                />
            }
        </div>
    )
}