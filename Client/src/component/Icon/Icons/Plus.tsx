import IconProps from "../IconProps";
import { styleIcon } from "../styleIcon";

export default function Plus(props: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.25" stroke="currentColor" style={styleIcon(props.style)} className={props.class}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    )
}