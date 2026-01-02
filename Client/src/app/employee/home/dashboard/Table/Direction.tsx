import ChevronDownIcon from "@/component/Icons/Icons/ChevronDownIcon";
import ChevronUpIcon from "@/component/Icons/Icons/ChevronUpIcon";
import clsx from "clsx";

interface DirectionProps {
    direction: "1" | "0" | null;
    updateDirection: () => void;
}

const BLUE = "#3B82F6";
const GRAY = "#CBD5E1";

export default function Direction(props: DirectionProps) {
    return (
        <div 
            onClick={props.updateDirection}
            className={clsx(
                "grid grid-rows-2 p-[2.5px]",
                "bg-base-0 dark:bg-base-50 border border-base-300 dark:border-base-200 rounded-[3px] shadow-none",
                "hover:stroke-gray-700 hover:bg-gray-50",
                "cursor-pointer"
            )}
        >
            <ChevronUpIcon
                className={clsx(
                    "size-1 stroke-[4px] cursor-pointer",
                    props.direction === "1" && "stroke-blue-500",
                    (props.direction === "0" || !props.direction) && "stroke-base-500",
                )}
            />
            <ChevronDownIcon
                className={clsx(
                    "size-1 stroke-[4px] cursor-pointer",
                    props.direction === "1" && "stroke-blue-500",
                    (props.direction === "0" || !props.direction) && "stroke-base-500",
                )}
            />
        </div>
    )
}