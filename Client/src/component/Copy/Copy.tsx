import clsx from "clsx";
import Clipboard from "../Icon/Clipboard";

interface CopyProps {
    label: string;
    value: string;
}

export default function Copy(props: CopyProps) {
    const copyValue = () => {
        navigator.clipboard.writeText(props.value);
    }

    return (
        <div 
            onClick={copyValue}
            className={clsx(
                "w-min flex justify-between items-center shadow-sm",
                "border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer pr-2 bg-white"
            )}
        >
            <span className="py-1 px-2 bg-gray-50 border-r border-r-gray-200 rounded-l-[5px] text-gray-400 font-medium text-xs tracking-wide">{props.label}</span>
            <span className="py-1 px-2 text-gray-700 font-medium whitespace-nowrap text-xs tracking-wide">{props.value}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3.5 stroke-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
        </div>
    )
}