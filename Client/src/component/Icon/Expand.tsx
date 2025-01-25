import { IconProps } from "./IconProps";

export default function ExpandIcon(props: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width || "13"} height={props.height || "13"} fill={props.fill || "currentColor"} stroke={props.stroke || "currentColor"} className="bi bi-chevron-expand stroke-gray-700 stroke-[0.5px]" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708"/>
        </svg>
    )
}