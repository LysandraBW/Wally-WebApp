import IconProps from "../IconProps";
import { styleIcon } from "../styleIcon";

export default function ChevronUpIcon(props: IconProps) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={styleIcon(props.style)} className={props.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
      </svg>
    )
}