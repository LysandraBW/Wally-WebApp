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
                "w-min flex justify-between items-center gap-2 py-1 px-2",
                "border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
            )}
        >
            <span className="text-02 font-medium whitespace-nowrap">{props.label}</span>
            <Clipboard
                fill="#9CA3AF"
                stroke="#9CA3AF"
                strokeWidth="0.5"
                cursor="pointer"
            />
        </div>
    )
}