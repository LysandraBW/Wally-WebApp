export default function Check({color, width, height, strokeWidth}: {color: string, width: string, height: string, strokeWidth: string}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} stroke={color} strokeWidth={strokeWidth} className="bi bi-check2" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
        </svg>
    )
}