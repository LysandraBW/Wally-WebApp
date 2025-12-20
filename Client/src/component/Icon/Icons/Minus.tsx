import IconProps from "../IconProps";
import { styleIcon } from "../styleIcon";

export default function Minus(props: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" style={styleIcon(props.style)} className={props.class}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
    )
}

