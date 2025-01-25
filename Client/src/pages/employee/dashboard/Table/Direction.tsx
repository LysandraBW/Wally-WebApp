import CaretDown from "@/component/Icon/CaretDown";
import CaretUp from "@/component/Icon/CaretUp";
import ChevronDownIcon from "@/component/Icon/ChevronDown";
import ChevronUpIcon from "@/component/Icon/ChevronUp";

interface DirectionProps {
    direction: "1" | "0" | null;
}

const BLUE = "#3B82F6";
const GRAY = "#CBD5E1";

export default function Direction(props: DirectionProps) {
    return (
        <div className="grid grid-rows-2">
            <ChevronUpIcon
                width="6"
                height="6"
                fill={props.direction === "1" ? BLUE : GRAY}
                stroke={props.direction === "1" ? BLUE : GRAY}
                strokeWidth="2"
            />
            <ChevronDownIcon
                width="6"
                height="6"
                fill={props.direction === "0" ? BLUE : GRAY}
                stroke={props.direction === "0" ? BLUE : GRAY}
                strokeWidth="2"
            />
        </div>
    )
}