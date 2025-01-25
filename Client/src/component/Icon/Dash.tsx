import { IconProps } from "./IconProps";

export default function DashIcon(props: IconProps) {
    return (
        <div className="stroke-gray-700 stroke-1">
            <svg xmlns="http://www.w3.org/2000/svg" stroke={props.stroke || "#000"} strokeWidth={props.strokeWidth || "0"} width={props.width || "16"} height={props.height || "16"} fill={props.fill || "currentColor"} className="bi bi-dash" viewBox="0 0 16 16">
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
            </svg>
        </div>
    )
}