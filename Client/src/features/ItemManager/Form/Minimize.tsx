import clsx from "clsx";

interface MinimizeButtonProps {
    onMinimize: () => void;
}

export default function MinimizeButton(props: MinimizeButtonProps) {
    return (
        <button
            onClick={props.onMinimize}
            className={clsx(
                "rounded p-1 bg-white w-min hover:bg-gray-50 hover:shadow-xs transition-all",
                "border border-gray-300 shadow-sm stroke-gray-400 hover:stroke-black"
            )}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[16px] h-[16px] stroke-inherit">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
            </svg>

        </button>
    )
}