interface SVGProps {
    width: string;
    height: string;
    color: string;
    strokeWidth: string;
}

export default function CaretLeft(props: SVGProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill={props.color} strokeWidth={props.strokeWidth} stroke={props.color} className="bi bi-caret-left" viewBox="0 0 16 16">
            <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
        </svg>
    )
}