import IconProps from "../IconProps";
import { styleIcon } from "../styleIcon";

export default function CheckIcon(props: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={styleIcon(props.style)} className={props.className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    )
}