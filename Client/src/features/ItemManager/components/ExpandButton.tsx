import clsx from "clsx";

interface ExpandButtonProps {
    onExpand: () => void;
}

export default function ExpandButton(props: ExpandButtonProps) {
    return (
        <button
            onClick={props.onExpand}
            className={clsx(
                "rounded p-1 bg-white w-min hover:bg-gray-50 hover:shadow-xs transition-all",
                "border border-gray-300 shadow-sm stroke-gray-400 hover:stroke-black"
            )}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[16px] h-[16px] stroke-inherit">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
        </button>
    )
}