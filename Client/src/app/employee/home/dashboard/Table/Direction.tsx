import ChevronDownIcon from "@/component/Icon/Icons/ChevronDown";
import ChevronUpIcon from "@/component/Icon/Icons/ChevronUp";

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
            className="grid grid-rows-2 bg-white p-[2.5px] cursor-pointer rounded-sm border border-gray-300 shadow-none stroke-gray-400 hover:stroke-gray-700 hover:bg-gray-50"
        >
            <ChevronUpIcon
                width="4"
                height="4"
                cursor="pointer"
                fill={props.direction === "1" ? BLUE : (props.direction === "0" ? GRAY : "inherit")}
                stroke={props.direction === "1" ? BLUE : (props.direction === "0" ? GRAY : "inherit")}
                strokeWidth="2"
            />
            <ChevronDownIcon
                width="4"
                height="4"
                cursor="pointer"
                fill={props.direction === "0" ? BLUE : (props.direction === "1" ? GRAY : "inherit")}
                stroke={props.direction === "0" ? BLUE : (props.direction === "1" ? GRAY : "inherit")}
                strokeWidth="2"
            />
        </div>
    )
}